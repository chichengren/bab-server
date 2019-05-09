'use strict';

// app/service/user.js
const Service = require('egg').Service;

const COLLECTION_RESERVATION = 'reservations';

class CourtService extends Service {
  async getReservations() {
    const { mongo } = this.app;
    const { logger } = this.context;

    logger.info(`service.court.getReservations`);

    return await mongo.find(COLLECTION_RESERVATION);
  }

  async addReservation(courtNumber, players, startAt, randoms = false) {
    const { mongo } = this.app;
    const { logger } = this.context;

    logger.info(`service.court.addReservation - courtNumber: ${courtNumber} players #: ${players.length}`);

    await mongo.insertOne(COLLECTION_RESERVATION, { courtNumber, players, startAt, randoms });
  }

  async deleteReservations() {
    // TODO
  }

  async updateReservations() {
    // TODO
  }
}

module.exports = CourtService;
