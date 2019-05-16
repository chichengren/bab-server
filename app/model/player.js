'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const PlayerSchema = new Schema({
    name: { type: String, index: true },
    password: String,
    // court reservation
    courtNumber: Number,
    reservationToken: { type: String, index: true },
    // member
    slackId: String
  }, {
    collection: 'players'
  });

  const PlayerModel = mongoose.model('Player', PlayerSchema);

  return PlayerModel;
};
