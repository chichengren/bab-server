'use strict';

const Controller = require('egg').Controller;

class CourtsController extends Controller {
  async index() {
    const reservations = await this.ctx.service.court.getReservations();

    this.ctx.body = { success: true, reservations };
  }

  async register() {
    const { ctx } = this;
  }

  async unregister() {
    const { ctx } = this;
  }

  async reset() {
    const { ctx } = this;
  }
}

module.exports = CourtsController;
