import fs from 'fs';
import chalk from 'chalk';
import getDiaryFavePerWeek from './src/getDiaryFavePerWeek.js';
import getDiaryFavePerWeek22Work from './src/getDiaryFavePerWeek22Work.js';
import getDiaryTwoPerDay22Work from './src/getDiaryTwoPerDay22Work.js';
import { parseInput } from './src/utils.js';
import { tableHeader } from './src/texts.js';

const params = parseInput();

const actions = {
  'twoperday22work': getDiaryTwoPerDay22Work,
  'twoperday': () => { throw new Error(chalk.red('Sorry, this diary type under development.')) }, // two measurements per day without limits
  'fiveperweek22work': getDiaryFavePerWeek22Work,
  'fiveperweek': getDiaryFavePerWeek,
};

if (!actions[params.diaryType]) {
  throw new Error(chalk.red('Unknown type of the diary.'));
}

const dairy = actions[params.diaryType](params);

const text = tableHeader + dairy.map((el) => el.join('|')).join('\n');

fs.writeFileSync('./output.txt', text, 'utf-8');
