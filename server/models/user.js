const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  sessionToken: String,
  role: {
    type: String,
    required: true,
    default: 'PENDING',
    validate: {
      validator: (type) => {
        const roles = ['ADMIN', 'VIEWER', 'PENDING'];
        return roles.indexOf(type);
      },
      message: (props) =>
        `${props.value} is not a valid role.\nValid roles: ${roles.join(', ')}`,
    },
  },
});

module.exports = mongoose.model('User', userSchema);
