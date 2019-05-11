'use strict';

const Controller = require('egg').Controller;

class SessionController extends Controller {
  async start() {
    try {
      await this.service.session.start();
    } catch (error) {
      this.ctx.body = { error: error.messeage };
      this.ctx.status = 400;
      return;
    }

    this.ctx.body = {};
  }

  async end() {
    try {
      await this.service.session.end();
    } catch (error) {
      this.ctx.body = { error: error.messeage };
      this.ctx.status = 400;
      return;
    }

    this.ctx.body = {};
  }

  async index() {
    const session = await this.service.session.get();

    if (!session) {
      this.ctx.status = 404;
      return;
    }

    this.ctx.body = { session };
  }
}

module.exports = SessionController;
