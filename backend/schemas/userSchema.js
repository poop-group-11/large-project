const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;


// Create Schema and Model
const UserSchema = new Schema(
  {
    username: String,
    pass: String,
    wins: Number,
    fish: [{type:ObjectId, ref: 'Fish'}]
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

// Export so we can use in other files in this project
module.exports = User;
