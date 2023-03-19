const shell = require('shelljs');

// 递归删除目录
const rmDir = (path) => {
  shell.rm('-rf', path);
};

// 执行 shell 命令
const exec = (command) => {
  // window 系统 cmd 下中文会出现乱码问题
  if (shell.exec(command, {encoding: 'utf8'}).code !== 0) {
    shell.echo(`shell.exec error: ${command}`);
    shell.exit(1);
  }
};

module.exports = {
  rmDir,
  exec,
};
