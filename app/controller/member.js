'use strict';

const Controller = require('egg').Controller;

class MemberController extends Controller {
  async index() {
    const members = await this.service.member.getAll();

    this.ctx.body = { members };
  }

  async get() {
    const { slackId } = this.ctx.request.body;

    if (!slackId) {
      this.ctx.status = 400;
      return;
    }

    const member = await this.service.member.get(slackId);

    if (!member) {
      this.ctx.status = 404;
      return;
    }

    this.ctx.body = { member };
  }

  async delete() {
    const { slackId } = this.ctx.request.body;

    if (!slackId) {
      this.ctx.status = 400;
      return;
    }

    await this.service.member.delete(slackId);

    this.ctx.body = {};
  }

  async add() {
    const { slackId } = this.ctx.request.body;
    let { name } = this.ctx.request.body;

    if (!slackId || !name) {
      this.ctx.status = 400;
      return;
    }

    name = name.toLowerCase();

    try {
      await this.service.member.add(slackId, name);
    } catch (error) {
      this.ctx.status = 400;
      return;
    }

    this.ctx.body = {};
  }
}

module.exports = MemberController;
