const mongoose = require('mongoose');
const logger = require('../../lib/logger');
module.exports = () => {
  const mongoURL = `mongodb://localhost:27017/CodeBlog`;

  mongoose.connect(mongoURL);

  let db = mongoose.connection;

  db.on('error', () => {
    logger.error(`Mongoose connection error:`);
  });
  db.once('open', () => {
    logger.info(`connected to ${mongoURL}`);
  });
};
