const inquirer = require('inquirer');

// 输入信息
const input = (message) => {
  return new Promise((resolve, reject) => {
    inquirer.prompt({
      type: 'input',
      name: 'value',
      message,
    }).then((answers) => {
      resolve(answers.value);
    });
  });
};

// 密码输入
const password = (message) => {
  return new Promise((resolve, reject) => {
    inquirer.prompt({
      type: 'password',
      name: 'value',
      message,
    }).then((answers) => {
      resolve(answers.value);
    });
  });
};

// 选择列表
const select = (message, choices) => {
  return new Promise((resolve, reject) => {
    inquirer.prompt({
      type: 'list',
      name: 'value',
      message,
      choices,
    }).then((answers) => {
      resolve(answers.value);
    });
  });
};

// 确认
const confirm = (message) => {
  return new Promise((resolve, reject) => {
    inquirer.prompt({
      type: 'confirm',
      name: 'value',
      message,
    }).then((answers) => {
      resolve(answers.value);
    });
  });
};

//
const multiSelect = (message, choices, defaultChoice) => {
  return new Promise((resolve, reject) => {
    inquirer.prompt({
      type: 'checkbox',
      name: 'value',
      message,
      choices,
      default: defaultChoice || [],
    }).then((answers) => {
      resolve(answers.value);
    });
  });
};

module.exports = {
  input,
  password,
  select,
  confirm,
  multiSelect,
};
