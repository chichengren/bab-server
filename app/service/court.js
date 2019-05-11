'use strict';

// app/service/court.js
const Service = require('egg').Service;

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

    await this.ctx.model.Reservation.create({ courtNumber, playerNames, startAt, endAt, randoms });
  }

  async removeReservation(courtNumber) {
    this.ctx.logger.info(`service.court.removeReservation - courtNumber: ${courtNumber}`);

    await this.ctx.model.Reservation.deleteOne({ courtNumber });
  }
}

module.exports = CourtService;
