const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model
const fishSchema = new Schema(
  {
    name: String,
    value: Number,
    sprite: String
  },
  { timestamps: true }
);

const User = mongoose.model('Fish', fishSchema);

// Export so we can use in other files in this project
module.exports = Fish;
