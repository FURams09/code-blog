const bunyan = require('bunyan');

logger = (name) =>
  bunyan.createLogger({
    name,
    level: `info`,
  });

module.exports = logger;
