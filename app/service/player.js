'use strict';

// app/service/user.js
const Service = require('egg').Service;

const COLLECTION_PLAYER = 'players';

class PlayerService extends Service {
  async addPlayer(name, password, slackId) {
    const { mongo } = this.app;
    const { logger } = this.context;

    logger.info(`service.player.addPlayer - name: ${name} password: ${password} slackId: ${slackId}`);

    await mongo.insertOne(COLLECTION_PLAYER, { name, password, slackId });
  }

  async getPlayers() {
      // TODO
  }

  async deletePlayer(name) {
    const { mongo } = this.app;
    const { logger } = this.context;

    logger.info(`service.player.deletePlayer - name: ${name}`);

    await mongo.deleteOne(COLLECTION_PLAYER, { name });
  }
}

module.exports = PlayerService;
