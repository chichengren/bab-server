'use strict';

// app/service/court.js
const Service = require('egg').Service;
const uuid = require('uuid/v4');

class CourtService extends Service {
  async getReservations({ active = false }) {
    this.ctx.logger.info('service.court.getReservations');

    const timestamp = Date.now();

    let query = this.ctx.model.Reservation.find();

    if (active) {
      query = query.where('startAt').lte(timestamp);
      // TODO: check endAt also after bot migrate over
      // .where('endAt').gte(timestamp);
    }

    const reservations = await query.exec();

    return reservations.map(r => {
      const endAt = r.endAt ? r.endAt : r.startAt + 45 * 60 * 1000;

      r.endAt = endAt;

      return r;
    }).filter(r => r.endAt >= timestamp);
  }

  async addReservation(courtNumber, names, delayInMinutes, durationInMinutes, randoms) {
    this.ctx.logger.info(`service.court.addReservation - courtNumber: ${courtNumber} names #: ${names.length}`);

    if (names.length > 4) {
      throw new Error('cannot have more than 4 players on the court');
    }

    // check player status
    const players = await this.ctx.model.Player.find()
      .where('name').in(names)
      .exec();

    if (players.length !== names.length) {
      throw new Error('player not found in the system');
    }

    players.forEach(player => {
      if (player.courtNumber) {
        throw new Error(`player: ${player.name} has already signed on court: ${player.courtNumber}`);
      }
    });

    const previousCourts = await this.ctx.model.Reservation.find({ courtNumber }).sort({ startAt: -1 }).exec();

    let startAt;
    let endAt;

    if (previousCourts.length === 0) {
      startAt = Date.now() + delayInMinutes * 60 * 1000;
      endAt = startAt + durationInMinutes * 60 * 1000;
    } else {
      const lastReservation = previousCourts[0];

      // TODO: remove checking
      if (!lastReservation.endAt) {
        lastReservation.endAt = lastReservation.startAt + 45 * 60 * 1000;
      }

      startAt = lastReservation.endAt + delayInMinutes * 60 * 1000;
      endAt = startAt + durationInMinutes * 60 * 1000;
    }

    const reservation = await this.ctx.model.Reservation.create({ token: uuid(), courtNumber, players: names, startAt, endAt, randoms });

    // update player status
    await this.ctx.model.Player.updateMany({ name: { $in: names } }, { $set: { courtNumber, reservationToken: reservation.token } });

    return reservation;
  }

  async removeReservation(token) {
    this.ctx.logger.info(`service.court.removeReservation - token: ${token}`);

    const reservation = await this.ctx.model.Reservation.findOne({ token });

    // update player status
    await this.ctx.model.Player.updateMany({ name: { $in: reservation.players } }, { $unset: { courtNumber: '', reservationToken: '' } });

    // remove reservation
    await this.ctx.model.Reservation.deleteOne({ token });

    // move up following reservations
    const followingReservations = await this.ctx.model.Reservation.find()
      .where('startAt').gte(reservation.endAt)
      .sort('startAt')
      .exec();

    if (followingReservations.length !== 0) {
      const timeDiff = followingReservations[0].startAt - Date.now();

      for (const r of followingReservations) {
        const startAt = r.startAt - timeDiff;
        const endAt = r.endAt - timeDiff;
        await this.ctx.model.Reservation.updateOne({ token: r.token }, { startAt, endAt });
      }
    }
  }
}

module.exports = CourtService;
