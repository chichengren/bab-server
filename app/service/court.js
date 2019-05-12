'use strict';

// app/service/court.js
const Service = require('egg').Service;
const uuid = require('uuid/v4');

class CourtService extends Service {
  async getActiveReservations() {
    this.ctx.logger.info('service.court.getActiveReservations');

    const timestamp = Date.now();

    return await this.ctx.model.Reservation
      .where('startAt').lte(timestamp)
      .where('endAt')
      .gte(timestamp)
      .exec();
  }

  async addReservation(courtNumber, playerNames, startAt, endAt, randoms) {
    this.ctx.logger.info(`service.court.addReservation - courtNumber: ${courtNumber} playerNames #: ${playerNames.length}`);

    if (playerNames.length > 4) {
      throw new Error('cannot have more than 4 players on the court');
    }

    // check player status
    const players = await this.ctx.model.Player.find()
      .where('playerName').in(playerNames)
      .exec();

    if (players.length !== playerNames.length) {
      throw new Error('player not found in the system');
    }

    players.forEach(player => {
      if (player.courtNumber) {
        throw new Error(`player: ${player.playerName} has already signed on court: ${player.courtNumber}`);
      }
    });

    // TODO: check court status

    // add reservation
    const reservation = await this.ctx.model.Reservation.create({ token: uuid(), courtNumber, playerNames, startAt, endAt, randoms });

    // update player status
    await this.ctx.model.Player.updateMany({ playerName: { $in: playerNames } }, { $set: { courtNumber, reservationToken: reservation.token } });

    return reservation;
  }

  async removeReservation(token) {
    this.ctx.logger.info(`service.court.removeReservation - token: ${token}`);

    const reservation = await this.ctx.model.Reservation.findOne({ token });

    // update player status
    await this.ctx.model.Player.updateMany({ playerName: { $in: reservation.playerNames } }, { $unset: { courtNumber: '', reservationToken: '' } });

    // remove reservation
    await this.ctx.model.Reservation.deleteOne({ token });
  }
}

module.exports = CourtService;
