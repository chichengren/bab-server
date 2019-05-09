'use strict';

// app/service/user.js
const Service = require('egg').Service;

class CourtService extends Service {
  async getReservations() {
    const { mongo } = this.app;

    console.log(await mongo.find('reservations'));
  }
}

module.exports = CourtService;
