const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

// Create Schema and Model
const SessionSchema = new Schema(
  {
    _id: shortid.generate,
    isExpired: Boolean,
    users:  [{type:ObjectId, ref: 'User'}],
    winner:  {type:ObjectId, ref: 'User'}
  },
  { timestamps: true }
);

const User = mongoose.model('Session', SessionSchema);

// Export so we can use in other files in this project
module.exports = Session;
