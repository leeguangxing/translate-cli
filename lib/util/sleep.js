const sleep = (millisecond) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, millisecond);
  });
};

module.exports = {
  sleep,
};
