const bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: `Code-Blog`,
  level: `trace`,
});

module.exports = logger;
