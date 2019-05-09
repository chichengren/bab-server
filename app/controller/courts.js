'use strict';

const Controller = require('egg').Controller;

class CourtsController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.service.court.getReservations();

    ctx.body = 'getting reservations';
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
