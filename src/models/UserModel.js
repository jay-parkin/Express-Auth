const mongoose = require("mongoose");

// Creates the layout of the collection inside the DB
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLenth: 3,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLenth: 8,
    trim: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
