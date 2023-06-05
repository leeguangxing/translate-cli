const path = require('path');
const fetch = require('cross-fetch');
const {overWrite} = require('../lib/file');

module.exports = async function(params) {
  const {url, output, language = 'zh-cn,en-us'} = params;
  const lang = language.split(',');
  if (url) {
    for (let i = 0; i< lang.length; i++) {
      const l = lang[i];
      const response = await fetch(`${url}/get_data/${l}`);
      const jsonData = await response.json();
      let outputPath = process.cwd();
      if (output) {
        outputPath = path.join(outputPath, output, `${l}.json`);
      } else {
        outputPath = path.join(outputPath, `${l}.json`);
      }
      overWrite(outputPath, jsonData, 4);
    }
  }
};
