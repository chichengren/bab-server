'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ReservationSchema = new Schema({
    courtNumber: { type: Number, index: true, unique: true },
    playerNames: [ String ],
    startAt: { type: Number, index: true },
    endAt: { type: Number, index: true },
    randoms: Boolean
  }, {
    collection: 'reservations'
  });

  const ReservationModel = mongoose.model('Reservation', ReservationSchema);

  return ReservationModel;
};
