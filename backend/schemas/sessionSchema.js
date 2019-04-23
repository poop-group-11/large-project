const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
var ObjectId = mongoose.Schema.Types.ObjectId;



// Create Schema and Model
const SessionSchema = new Schema(
  {
    _id: {'type': String, 'default': shortid.generate.toUpperCase()},
    isStarted: Number,
    users:  [{type:ObjectId, ref: 'User'}],
    userLength: {'type': Number, 'default': 0},
    winner:  {type:ObjectId, ref: 'User'}
  },
  { timestamps: true }
);



const Session = mongoose.model('Session', SessionSchema);

// Export so we can use in other files in this project
module.exports = Session;
