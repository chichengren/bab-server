'use strict';

const Service = require('egg').Service;

class SessionService extends Service {
  async start() {
    this.ctx.logger.info('service.session.start');

    const session = await this.get();

    if (session) {
      throw new Error('session record already existed');
    }

    await this.ctx.model.Session.create({ startAt: Date.now() });
  }

  async end() {
    this.ctx.logger.info('service.session.getSession');

    const record = await this.get();

    if (!record) {
      throw new Error('session record not found');
    }

    const session = { ...record };

    await this.ctx.model.Session.deleteOne();

    return session;
  }

  async get() {
    return await this.ctx.model.Session.findOne();
  }
}

module.exports = SessionService;
