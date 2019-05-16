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
  async add(name, password, slackId) {
    this.ctx.logger.info(`service.player.add - name: ${name} password: ${password} slackId: ${slackId}`);

    if (!ZODIAC.includes(password)) {
      throw new Error('zodiac not found');
    }

    await this.ctx.model.Player.create({ name, password, slackId });
  }

  async getAll() {
    this.ctx.logger.info('service.player.getAll');

    return await this.ctx.model.Player.find();
  }

  async get(name) {
    this.ctx.logger.info(`service.player.get - name: ${name}`);

    return await this.ctx.model.Player.findOne({ name });
  }

  async delete(name) {
    this.ctx.logger.info(`service.player.delete - name: ${name}`);

    await this.ctx.model.Player.deleteOne({ name });
  }
}

module.exports = PlayerService;
