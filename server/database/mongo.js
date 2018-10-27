const mongoose = require('mongoose');
const { logger } = require('../../lib/logger');

dbLogger = logger(`MongoDB`);
module.exports = () => {
  const mongoURL = `mongodb://localhost:27017/CodeBlog`;

  mongoose.connect(mongoURL);

  let db = mongoose.connection;

  db.on('error', () => {
    dbLogger.error(`Mongoose connection error:`);
  });
  db.once('open', () => {
    dbLogger.info(`connected to ${mongoURL}`);
  });
};
