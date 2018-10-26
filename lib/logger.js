const bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: 'Code-Blog',
});

module.exports = logger;
