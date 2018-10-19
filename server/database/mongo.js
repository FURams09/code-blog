const mongoose = require('mongoose');

module.exports = () => {
  const mongoURL = `mongodb://localhost:27017/CodeBlog`;

  mongoose.connect(mongoURL);

  let db = mongoose.connection;

  db.on('error', () => {
    console.log(`Mongoose connection error:`);
  });
  db.once('open', () => {
    console.log(`connected to ${mongoURL}`);
  });
};
