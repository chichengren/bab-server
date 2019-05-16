'use strict';

// app/service/member.js
const Service = require('egg').Service;

class MemberService extends Service {
  async add(slackId, name) {
    this.ctx.logger.info(`service.member.add - slackId: ${slackId} name: ${name}`);

    if (await this.get(slackId)) {
      throw new Error('slack Id already registered');
    }

    await this.ctx.model.Member.create({ slackId, name });
  }

  async get(slackId) {
    this.ctx.logger.info(`service.member.get - slackId: ${slackId}`);

    return await this.ctx.model.Member.findOne({ slackId });
  }

  async getAll() {
    this.ctx.logger.info('service.member.getAll');

    return await this.ctx.model.Member.find();
  }

  async delete(slackId) {
    this.ctx.logger.info(`service.member.delete - slackId: ${slackId}`);

    await this.ctx.model.Member.deleteOne({ slackId });
  }
}

module.exports = MemberService;
