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
    const { slackId } = this.ctx.request.query;
    let { playerName } = this.ctx.request.query;

    if (slackId) {
      const member = await this.service.member.get(slackId);

      if (!member) {
        this.ctx.status = 400;
        return;
      }

      playerName = member.playerName;
    }

    const player = await this.service.player.get(playerName.toLowerCase());

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
