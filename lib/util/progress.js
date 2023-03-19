const cliProgress = require('cli-progress');

const getProgressBar = (name) => {
  return new cliProgress.SingleBar({
    format: name + ' {bar} {percentage}% ({value}/{total})',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
  });
};

module.exports = {
  getProgressBar,
};
