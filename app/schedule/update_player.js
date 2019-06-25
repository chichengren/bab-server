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
      let clearReservation = false;

      if (!reservation) {
        // TODO: reservation might be cleared by bab-bot
        clearReservation = true;
      } else {
        // TODO: remove until bot migrate over
        const endAt = reservation.endAt ? reservation.endAt : reservation.startAt + 45 * 60 * 1000;

        if (endAt < Date.now()) {
          clearReservation = true;
        }
      }

      if (clearReservation) {
        await ctx.model.Player.updateOne({ name: player.name }, { $unset: { reservationToken: '', courtNumber: '' } });
      }
    }
  }
};
