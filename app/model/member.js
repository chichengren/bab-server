'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MemberSchema = new Schema({
    slackId: { type: String, index: true, unique: true },
    name: { type: String, index: true }
  }, {
    collection: 'members'
  });

  const MemberModel = mongoose.model('Member', MemberSchema);

  return MemberModel;
};
