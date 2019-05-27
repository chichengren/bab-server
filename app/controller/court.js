'use strict';

const Controller = require('egg').Controller;

class CourtController extends Controller {
  async index() {
    const { active } = this.ctx.request.query;

    const reservations = await this.service.court.getReservations({ active });

    this.ctx.body = { reservations };
  }

  async register() {
    const { courtNumber, names = [], delayInMinutes = 0, randoms = false, durationInMinutes = 45 } = this.ctx.request.body;

    if (!courtNumber) {
      this.ctx.status = 400;
      this.ctx.body = { message: 'Missing court number' };
      return;
    }

    if (!names.length && !randoms) {
      this.ctx.status = 400;
      this.ctx.body = { message: 'Must provide player names' };
      return;
    }

    try {
      const reservation = await this.service.court.addReservation(courtNumber, names, delayInMinutes, durationInMinutes, randoms);

      this.ctx.body = { reservation };
    } catch (error) {
      this.ctx.body = { error: error.message };
      this.ctx.status = 400;
    }
  }

  async unregister() {
    const { token } = this.ctx.request.body;

    if (!token) {
      this.ctx.status = 400;
      this.ctx.body = { message: 'Invalid court number' };
      return;
    }

    await this.service.court.removeReservation(token);

    this.ctx.body = {};
  }
}

module.exports = CourtController;
