import fs from 'fs';

// A constant for the number of milliseconds in a day
const MILLISECONDS_PER_DAY = 60*60*24*1000;
const DAYS_IN_WORK_CYCLE = 4;
export const DAIRY_TYPES = [
  'twoperday22work', // two measurements per day with a 2/2 work schedule
  'twoperday', // two measurements per day without limits
  'fiveperweek22work', // five measurements per week with a 2/2 work schedule
];


/**
 * Reads the file and parses the input data.
 * @returns {Object} An object with the start date and the length of the diary.
 */
function parseInput() {
  try {
    const content = fs.readFileSync('./input.json', 'utf-8');
    const params = JSON.parse(content);
    params.startDate = new Date(params.startDate);
    return params;
  } catch (e) {
    return {};
  }
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
  let secondIndex = Math.floor(Math.random() * secondSet.length);
  if (secondIndex === secondSet.length) {
    secondIndex = secondSet.length - 1;
  }
  const second = secondSet[secondIndex];
  return [first, second];
}

const tableHeader =
  '    Дата|Измерение сахара крови, ммоль/л\n'+
  '|Завтрак||Обед||Ужин\n' +
  '|До|После|До|После|До|После\n';

const text = tableHeader + dairy.map((el) => el.join('|')).join('\n');

fs.writeFileSync('./output.txt', text, 'utf-8');

export { parseInput };
