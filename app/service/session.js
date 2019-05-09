"use strict";

const Service = require("egg").Service;

const COLLECTION_SESSIONS = "sessions";

class SessionService extends Service {
  async addSeesion() {
    const { mongo } = this.app;
    const { logger } = this.context;

    logger.info(`service.session.addSession`);

    await mongo.insertOne(COLLECTION_SESSIONS, { startAt: Date.now() });
  }

  async getSession() {
    const { mongo } = this.app;
    const { logger } = this.context;

    logger.info(`service.session.getSession`);

    await mongo.getOne(COLLECTION_SESSIONS);
  }
}

module.exports = SessionService;
