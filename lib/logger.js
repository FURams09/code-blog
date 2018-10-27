const bunyan = require('bunyan');

exports.logger = (name) =>
  bunyan.createLogger({
    name,
    level: `info`,
  });

exports.debugLogger = (name) =>
  bunyan.createLogger({
    name: `${name || ''}Debug`,
    level: `trace`,
  });
