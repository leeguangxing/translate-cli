const log4js = require('log4js');
const path = require('path');

const pattern = '%d{yyyy-MM-dd hh:mm:ss.SSS} [%p] %c - %m';

log4js.configure({
  appenders: {
    stdout: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern,
      },
    },
    infoFile: {
      type: 'file',
      filename: path.join(process.cwd(), 'translate-cli-logs/info.log'),
      maxLogSize: 1024 * 1024, // 1M
      backups: 30,
      compress: false,
      layout: {
        type: 'pattern',
        pattern,
      },
    },
    errorFile: {
      type: 'file',
      filename: path.join(process.cwd(), 'translate-cli-logs/error.log'),
      maxLogSize: 1024 * 1024, // 1M
      backups: 30,
      compress: false,
      layout: {
        type: 'pattern',
        pattern,
      },
    },
  },
  categories: {
    default: {appenders: ['stdout', 'infoFile'], level: 'info'},
    error: {appenders: ['stdout', 'errorFile'], level: 'error'},
  },
  pm2: false,
});

const logger = {
  info(content) {
    return log4js.getLogger().info(content);
  },
  error(content) {
    return log4js.getLogger('error').error(content);
  },
};

module.exports = {
  logger,
  log4js,
};
