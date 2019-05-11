'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const SessionSchema = new Schema({
    startAt: Number
  }, {
    collection: 'sessions'
  });

  const SessionModel = mongoose.model('Session', SessionSchema);

  return SessionModel;
};
