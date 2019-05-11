'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const PlayerSchema = new Schema({
    playerName: { type: String, index: true },
    password: String,
    countNumber: { type: Number, index: true },
    slackId: String
  }, {
    collection: 'players'
  });

  const PlayerModel = mongoose.model('Player', PlayerSchema);

  return PlayerModel;
};
