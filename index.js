const fs = require('fs');

const content = fs.readFileSync('./input.txt', 'utf-8').split('\n');
const startDate = new Date(content[0].trim());
const dairyLength = Number(content[1].trim());
const DAY = 60*60*24*1000;

const dairy = [];

for (let i = 0; i < dairyLength; i += 1) {
  // record = [date, before breakfast, after breakfast, b.lunch, a.lunch, b.dinner, a.dinner]
  const record = [startDate.toLocaleDateString(), ' ', ' ', ' ', ' ', ' ', ' '];
  
  dairy.push(record);
  startDate.setTime(startDate.getTime() + DAY);
}
  
dairy.forEach((el, i) => {
  const reminderOfDivision = i % 4;
  let choosedIndexes = [];
  if (reminderOfDivision === 0) { // day work day
    const firstIndex = Math.random() < 0.5 ? 1 : 5;
    el[firstIndex] = '.';
    el[6] = '.';
  } else if (reminderOfDivision === 1) { // night work day
    choosedIndexes = ChooseTwoFromAmount(4);
  } else { // other days
    choosedIndexes = ChooseTwoFromAmount(6);
  }
  choosedIndexes.forEach((index) => {
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

const tableHeader = '    Дата|Измерение сахара крови, ммоль/л\n|Завтрак||Обед||Ужин\n|До|После|До|После|До|После\n';
const text = tableHeader + dairy.map((el) => el.join(' | ')).join('\n');

fs.writeFileSync('./output.txt', text, 'utf-8');
