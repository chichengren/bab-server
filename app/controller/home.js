'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.service.court.getReservations();
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
