const mongoose = require('mongoose');
const sessionSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    index: true,
  },
  user: {
    email: String,
    role: String,
    name: String,
  },
});

module.exports = mongoose.model('Session', sessionSchema);
