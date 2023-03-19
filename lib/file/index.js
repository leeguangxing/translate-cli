const fs = require('fs');
const request = require('request');
const {logger} = require('../logger');

// 覆盖方式写入 json 内容
const overWrite = (path, obj, space) => {
  try {
    fs.writeFileSync(path, JSON.stringify(obj, null, space || null), {
      encoding: 'utf8',
    });
  } catch (e) {
    logger.error(e.toString());
  }
};

// 同步创建目录
const mkdirSync = (path) => {
  try {
    fs.mkdirSync(path);
  } catch (e) {
    logger.error(e.toString());
  }
};

// 下载图片
const downloadImg = (downloadURL, savePath) => {
  return new Promise((resolve) => {
    request(downloadURL)
        .pipe(fs.createWriteStream(savePath))
        .on('close', () => {
          logger.info(`${downloadURL} 下载成功！`);
          resolve();
        })
        .on('error', (err) => {
          logger.error(`${downloadURL} 下载失败！错误信息： ${err.toString()}`);
          resolve();
        });
  });
};

module.exports = {
  overWrite,
  mkdirSync,
  downloadImg,
};
