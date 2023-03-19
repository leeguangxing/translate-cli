#!/usr/bin/env node

// 颜色字体
const chalk = require('chalk');

// 命令行参数工具
const commander = require('commander');

// 命令工具主文件
const matchCommandHandler = require('../commands/match');

// 引入 package.json 信息
const package = require('../package.json');

const program = new commander.Command();

// 定义版本号
program.version(package.version, '-v, --version', '获取版本号');

// 设置帮助信息的第一行
// Usage: xxx [options] command
program.name(package.name).usage('[options] command');

// 帮助信息后追加版权信息
program.on('--help', function() {
  console.log(`\n${chalk.bgGreen.bold('--- 作者: leeguangxing.cn ---')}`);
});

// 设置未知命令时的报错，并退出进程
program.on('command:*', function() {
  console.error(chalk.red('无效命令: %s'), program.args.join(' '));
  console.info('可通过 translate --help 查询可用的命令列表');
  process.exit(1);
});

// 指定命令及参数，最后通过 action 操作处理程序处理

// 捕获翻译字段
program
    .command('match')
    .alias('match'.charAt(0))
    .description('捕获指定目录下文件的翻译字段，并输出多语言 json 文件（到指定目录）')
    .option(
        '-f, --folder <必须>',
        '需要捕获的目录（绝对路径）',
    )
    .option('-o, --output [可选]', '指定输出多语言 json 文件的目录（绝对路径，默认为当前执行路径）')
    .action(matchCommandHandler);

// process.argv 属性返回一个数组，其中包含当启动 Node.js 进程时传入的命令行参数。
program.parse(process.argv);
