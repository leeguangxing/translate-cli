/* eslint-disable max-len */
const fs = require('fs');
const path = require('path');
const {glob} = require('../lib/util/glob');
const {multiSelect, confirm} = require('../lib/util/query');
const {overWrite} = require('../lib/file');

module.exports = async function(params) {
  const {folder, log, output = process.cwd()} = params;

  const logInFile = log === 'true';

  let info = console.info;

  if (logInFile) {
    const {logger} = require('../lib/logger');
    info = logger.info;
  }

  const ext = await multiSelect(
      '请选择您需要匹配的文件',
      ['ts', 'tsx', 'js', 'jsx'],
      ['ts', 'tsx'],
  );

  const langs = await multiSelect(
      '请选择您需要的语言，按空格选择',
      [
        'zh-cn', // 简体中文(中国)
        'zh-hk', // 繁体中文(中国香港)
        'en-us', // 英语
      ],
      ['zh-cn', 'en-us'],
  );

  console.log('匹配文件后缀：', ext.join('、'));
  console.log('翻译语种：', langs.join('、'));

  // 信息确认
  const confirmRes = await confirm('请确认您的选择信息');

  if (confirmRes && folder) {
    info(`匹配文件后缀：${ext.join('、')}`);
    info(`翻译语种：${langs.join('、')}`);
    info(`匹配目录：${folder}`);
    // 匹配目录文件
    // /Users/liguangxing/Feimei/dms-system/src/pages/uiMaterial
    const files = await glob(`${folder}/**/*.{${ext.join(',')}}`);
    if (files.length) {
      let allKeys = [];
      // 工人函数
      const matchContent = (filePath) => {
        const fileContent = fs.readFileSync(filePath, {
          encoding: 'utf8',
        });
        const matchRes = fileContent.match(/[^0-9a-zA-Z_$]ts\('(.+?)'/g);
        if (matchRes && matchRes.length) {
          const keys = matchRes.map((item) =>
            item.replace(/(^[^0-9a-zA-Z_$]ts\(')|('$)/g, ''),
          );
          if (keys.length) {
            const res = [...new Set(keys)];
            info(
                `当前匹配文件：${filePath}, 匹配结果：${JSON.stringify(res)}`,
            );
            return res;
          }
        }
      };
      for (let i = 0; i < files.length; i++) {
        const res = matchContent(files[i]);
        if (res) {
          allKeys = [...allKeys, ...res];
        }
      }
      const res = [...new Set(allKeys)].sort();
      // 写入文件
      for (let i = 0; i < langs.length; i++) {
        const filePath = path.join(output, `${langs[i]}.json`);
        const obj = {};
        res.forEach((item) => (obj[item] = item));
        overWrite(filePath, obj, 4);
        info(`${filePath} 文件生成成功！`);
      }
    } else {
      info('目录下无匹配文件');
    }
  }

  // 关闭日志
  if (logInFile) {
    const {log4js} = require('../lib/logger');
    log4js.shutdown();
  }
};
