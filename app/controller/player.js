'use strict';

const Controller = require('egg').Controller;

class PlayerController extends Controller {
  // TODO: check session

  async index() {
    const players = await this.ctx.model.Player.find();

    this.ctx.body = { players };
  }

  async add() {
    const { slackId, password } = this.ctx.request.body;
    let { name } = this.ctx.request.body;
    let member;

    if (!password || (!name && !slackId)) {
      this.ctx.status = 400;
      this.ctx.body = { message: 'Missing password, name or slackId' };
      return;
    }

    if (slackId) {
      member = await this.service.member.get(slackId);
    }

    name = member ? member.name : name;

    try {
      await this.service.player.add(name.toLowerCase(), password, slackId);
    } catch (error) {
      this.ctx.status = 400;
      this.ctx.body = { message: error.message };
      return;
    }

    this.ctx.body = {};
  }

  async get() {
    const { slackId } = this.ctx.request.query;
    let { name } = this.ctx.request.query;

    if (slackId) {
      const member = await this.service.member.get(slackId);

      if (!member) {
        this.ctx.status = 400;
        this.ctx.body = { message: 'Cannot find member given slackId' };
        return;
      }

      name = member.name;
    }

    const player = await this.service.player.get(name.toLowerCase());

    this.ctx.body = { player };
  }

  async delete() {
    const { slackId } = this.ctx.request.body;
    let { name } = this.ctx.request.body;

    if (slackId) {
      const member = await this.service.member.get(slackId);

      if (!member) {
        this.ctx.status = 400;
        this.ctx.body = { message: 'Cannot find member given slackId' };
        return;
      }

      name = member.name;
    }

    await this.service.player.delete(name.toLowerCase());

    this.ctx.body = {};
  }
}

module.exports = PlayerController;
