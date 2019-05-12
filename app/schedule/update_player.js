'use strict';

module.exports = {
  schedule: {
    interval: '15s',
    env: ['prod'],
    type: 'all'
  },
  async task(ctx) {
    // find all players that have been assigned a reservationToken
    const registeredPlayers = await ctx.model.Player.find({ reservationToken: { $exists: true } });

    // based on registered player, find reservations
    for (const player of registeredPlayers) {
      const reservation = await ctx.model.Reservation.findOne({ token: player.reservationToken });

      if (reservation.endAt < Date.now()) {
        await ctx.model.Player.updateOne({ playerName: player.playerName }, { $unset: { reservationToken: '', courtNumber: '' }});
      }
    }
  }
};
