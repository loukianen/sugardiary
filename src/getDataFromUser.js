import readlineSync from 'readline-sync';
import chalk from 'chalk';
import { getTomorrowDate, parseInput } from './utils.js';
import { DIARY_TYPES } from './consts.js';
import { texts } from './texts.js';

const currentParams = parseInput();
console.log(currentParams);

const tomorrow = getTomorrowDate(currentParams.startDate);
console.log(tomorrow.toLocaleDateString('ru-RU'));

// const newParams = {};

// const curStartDateAsText = currentParams.startDate
//   ? currentParams.startDate.toLocaleDateString('ru-RU')
//   : new Date(Date.now()).toLocaleDateString('ru-RU');
// const startDateDialogText = `${chalk.green(texts.dateQuestion)} ${chalk.yellow('', curStartDateAsText)}\n>`;

// const startDate = readlineSync.question(startDateDialogText, {
//   defaultInput: curStartDateAsText,
// });
// console.log(startDate);

// const professions = ['cook', 'driver', 'cop'];
// const defaultValue = 'wizard';
// const index = readlineSync.keyInSelect(professions, 'What is your professional activity?\n[0] - current value', {
//   cancel: defaultValue,
// });

// console.log(`${name} are ${[index]}.`);
