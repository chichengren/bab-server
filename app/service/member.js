'use strict';

// app/service/member.js
const Service = require('egg').Service;

class MemberService extends Service {
  async addMember(slackId, playerName) {
    this.ctx.logger.info(`service.member.addMember - slackId: ${slackId} playerName: ${playerName}`);

    await this.ctx.model.Member.create({ slackId, playerName });
  }

  async getMember(slackId) {
    this.ctx.logger.info(`service.member.getMember - slackId: ${slackId}`);
    
    return await this.ctx.model.Member.findOne({ slackId });
  }

  async getMembers() {
    // TODO
  }

  async deleteMember(slackId) {
    this.ctx.logger.info(`service.member.deleteMember - slackId: ${slackId}`);

    await this.ctx.model.Member.deleteOne({ slackId });
  }
}

module.exports = MemberService;
