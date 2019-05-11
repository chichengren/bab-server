'use strict';

const Controller = require('egg').Controller;

class MemberController extends Controller {
  async index() {
    this.ctx.body = 'hello bab';
  }

  async delete() {
    const { slackId } = this.ctx.request.body;

    if (!slackId) {
      this.ctx.status = 400;
      this.ctx.body = { success: false };
      return;
    }

    await this.ctx.service.member.deleteMember(slackId);

    this.ctx.body = { success: true };
  }

  async add() {
    const { slackId, playerName } = this.ctx.request.body;

    if (!slackId || !playerName) {
      this.ctx.status = 400;
      this.ctx.body = { succses: false };
      return;
    }

    try {
      await this.ctx.service.member.addMember(slackId, playerName);
    } catch (error) {
      this.ctx.body = { success: false, error: error.message };
      return;
    }

    this.ctx.body = { success: true };
  }
}

module.exports = MemberController;
