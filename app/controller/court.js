'use strict';

const Controller = require('egg').Controller;

class CourtController extends Controller {
  async index() {
    const reservations = await this.service.court.getActiveReservations();

    this.ctx.body = { reservations };
  }

  async register() {
    const { courtNumber, playerNames, delayInMinutes = 0, randoms = false, durationInMinutes = 45 } = this.ctx.request.body;

    if (!courtNumber) {
      this.ctx.status = 400;
      this.ctx.body = { message: 'Missing court number' };
      return;
    }

    if (!playerNames || !playerNames.length) {
      this.ctx.status = 400;
      this.ctx.body = { message: 'Must provide player names' };
      return;
    }

    const startAt = Date.now() + delayInMinutes * 60 * 1000;
    const endAt = startAt + durationInMinutes * 60 * 1000;

    try {
      const reservation = await this.service.court.addReservation(courtNumber, playerNames, startAt, endAt, randoms);

      this.ctx.body = { reservation };
    } catch (error) {
      this.ctx.body = { error: error.message };
      this.ctx.status = 400;
    }
  }

  async unregister() {
    const { courtNumber } = this.ctx.request.body;

    if (!courtNumber) {
      this.ctx.status = 400;
      this.ctx.body = { message: 'Invalid court number' };
      return;
    }

    await this.service.court.removeReservation(courtNumber);

    this.ctx.body = {};
  }
}

module.exports = CourtController;
