const path = require('path');
const {logger, log4js} = require('../lib/logger');
const {glob} = require('../lib/util/glob');
const {sleep} = require('../lib/util/sleep');
const {
  input,
  select,
  multiSelect,
  confirm,
  password,
} = require('../lib/util/query');
const {rmDir, exec} = require('../lib/util/shell');
const {getProgressBar} = require('../lib/util/progress');

module.exports = async function(params) {
  // 日志记录
  logger.info('this is info log');
  logger.error('this is error log');

  // 睡眠 1 秒
  // await sleep(1)

  console.log('params', params);

  // 递归删除目录
  rmDir('temp');

  // 执行任意 shell 命令
  exec('git status');

  // 匹配目录文件
  // const files = await glob('lib/**/*.{js,log}')
  // console.log('files', files)

  //
  const multiChoice = await multiSelect(
      'What\'s your skill? (Use space to select)',
      ['javascript', 'python', 'c++'],
  );
  console.log('multiChoice', multiChoice);

  // 信息输入
  const name = await input('What\'s your name?');
  console.log('name: ', name);

  // 密码输入
  const pwd = await password('Please input our password (Enter to confirm): ');
  console.log('password', pwd);

  // 条件选择
  const choice = await select('What\'s your favorite color?', [
    'pink',
    'blue',
    'yellow',
  ]);
  console.log('choice', choice);

  // 信息确认
  const confirmRes = await confirm('Are your sure?');
  console.log('confirmRes', confirmRes);


  // 进度条
  const progressBar = getProgressBar('download file');

  progressBar.start(100, 0);

  let percentage = 0;
  const timer = setInterval(() => {
    progressBar.increment();
    progressBar.update(percentage);
    ++percentage;
    if (percentage > 100) {
      progressBar.stop();
      clearInterval(timer);
      console.log('commands finished!');
    }
  }, 10);

  // 关闭日志
  log4js.shutdown();
};
