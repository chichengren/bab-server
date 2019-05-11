'use strict';

const Controller = require('egg').Controller;

class PlayerController extends Controller {
  async index() {
    // TODO: court number?
    this.ctx.body = { players: await this.service.player.getAll() };
  }

  async add() {
    const { slackId, password } = this.ctx.request.body;
    let { playerName } = this.ctx.request.body;
    let member;

    if (!password || (!playerName && !slackId)) {
      this.ctx.status = 400;
      return;
    }

    if (slackId) {
      member = await this.service.member.get(slackId);
    }

    playerName = member ? member.playerName : playerName;

    try {
      await this.service.player.add(playerName.toLowerCase(), password, slackId);
    } catch (error) {
      this.ctx.status = 400;
    }

    this.ctx.body = {};
  }

  async get() {
    const { slackId } = this.ctx.body;
    let { playerName } = this.ctx.body;

    if (slackId) {
      const member = await this.service.member.get(slackId);

      if (!member) {
        this.ctx.status = 400;
        return;
      }

      playerName = member.playerName;
    }

    const player = await this.service.player.get(playerName);

    this.ctx.body = { player };
  }

  async delete() {
    const { slackId } = this.ctx.request.body;
    let { playerName } = this.ctx.request.body;

    if (slackId) {
      const member = await this.service.member.get(slackId);

      if (!member) {
        this.ctx.status = 400;
        return;
      }

      playerName = member.playerName;
    }

    await this.service.player.delete(playerName.toLowerCase());

    this.ctx.body = {};
  }
}

module.exports = PlayerController;
