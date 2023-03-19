const glob = require('glob');
const {logger} = require('../logger');

const main = async function(patternDir, options = {}) {
  const res = await new Promise((resolve, reject) => {
    glob(patternDir, options, function(err, files) {
      if (err) {
        logger.error(err.toString());
        reject(new Error(err.toString()));
      } else {
        resolve(files);
      }
    });
  });
  return res;
};

module.exports = {
  glob: main,
};
