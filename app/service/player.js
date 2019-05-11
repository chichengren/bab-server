'use strict';

// app/service/user.js
const Service = require('egg').Service;

const ZODIAC = [
  'mouse',
  'ox',
  'tiger',
  'rabbit',
  'dragon',
  'snake',
  'horse',
  'goat',
  'monkey',
  'rooster',
  'dog',
  'pig',
  'cat'
];

class PlayerService extends Service {
  async add(playerName, password, slackId) {
    this.ctx.logger.info(`service.player.add - playerName: ${playerName} password: ${password} slackId: ${slackId}`);

    if (!ZODIAC.includes(password)) {
      throw new Error('zodiac not found');
    }

    await this.ctx.model.Player.create({ playerName, password, slackId });
  }

  async getAll() {
    this.ctx.logger.info('service.player.getAll');

    return await this.ctx.model.Player.find();
  }

  async get(playerName) {
    this.ctx.logger.info(`service.player.get - playerName: ${playerName}`);

    return await this.ctx.model.Player.findOne({ playerName });
  }

  async delete(playerName) {
    this.ctx.logger.info(`service.player.delete - playerName: ${playerName}`);

    await this.ctx.model.Player.deleteOne({ playerName });
  }
}

module.exports = PlayerService;
