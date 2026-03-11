const fs = require('fs');

// A constant for the number of milliseconds in a day
const MILLISECONDS_PER_DAY = 60*60*24*1000;
const DAYS_IN_WORK_CYCLE = 4;

/**
 * Reads the file and parses the input data.
 * @returns {Object} An object with the start date and the length of the diary.
 */
function parseInput() {
  const content = fs.readFileSync('./input.txt', 'utf-8').split('\n');
  const startDate = new Date(content[0].trim());
  const diaryLength = Number(content[1].trim());
  return { startDate, diaryLength };
}

const { startDate, diaryLength } = parseInput();


const dairy = [];

for (let i = 0; i < diaryLength; i += 1) {
  // record = [date, before breakfast, after breakfast, b.lunch, a.lunch, b.dinner, a.dinner]
  const record = [startDate.toLocaleDateString(), '', '', '', '', '', ''];
  
  dairy.push(record);
  startDate.setTime(startDate.getTime() + MILLISECONDS_PER_DAY);
}
  
dairy.forEach((el, i) => {
  const dayInWorkCycle = i % DAYS_IN_WORK_CYCLE;
  let selectedIndexes = [];
  if (dayInWorkCycle === 0) { // day work day use before breckfast or dinner and after dinner only
    const firstIndex = Math.random() < 0.5 ? 1 : 5;
    el[firstIndex] = '.';
    el[6] = '.';
  } else if (dayInWorkCycle === 1) { // night work day don't use dinner
    selectedIndexes = ChooseTwoFromAmount(4);
  } else { // other days without limitation
    selectedIndexes = ChooseTwoFromAmount(6);
  }
  selectedIndexes.forEach((index) => {
    el[index] = '.';
  });
});

// function coose two indexes from 1 to 'amount'.
// If first is even (after eating), then second should be uneven (before eating)
function ChooseTwoFromAmount(amount) {
  let first = Math.ceil(Math.random() * amount);
  if (first === 0) {
    first = 1;
  }
  const secondSet = [];
  const startIndex = first % 2 === 0 ? 1 : 2;
  for (let i = startIndex; i <= amount; i += 2) {
    secondSet.push(i);
  }
  const second = secondSet[Math.round(Math.random() * (secondSet.length - 1))];
  return [first, second];
}

const tableHeader =
  '    Дата|Измерение сахара крови, ммоль/л\n'+
  '|Завтрак||Обед||Ужин\n' +
  '|До|После|До|После|До|После\n';

const text = tableHeader + dairy.map((el) => el.join('|')).join('\n');

fs.writeFileSync('./output.txt', text, 'utf-8');
