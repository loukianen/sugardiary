import fs from 'fs';
import { DIARY_TYPES, MILLISECONDS_PER_DAY } from './consts.js';

// If 'amount' is Number, then choose from 1 to 'amount'.
// If 'amount' is Array, then choose one of array's member.
export function chooseOneFromAmount(amount) { 
  let dataForCoosingIndex = amount instanceof Array ? amount.length : amount;
  let index = Math.ceil(Math.random() * dataForCoosingIndex);
  if (index === 0) {
   index = 1;
  }
  return amount instanceof Array ? amount[index - 1] : index;
}

// function coose two indexes from 1 to 'amount'.
// If first is even (after eating), then second should be uneven (before eating)
export function chooseTwoFromAmount(amount) {
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

export function getTomorrowDate(date) {
  const res = new Date();
  res.setTime(date.getTime() + MILLISECONDS_PER_DAY);
  return res;
}

export function getEmptyRecord(date) {
  return [date.toLocaleDateString(), '', '', '', '', '', ''];
}

/**
 * Reads the file and parses the input data.
 * @returns {Object} An object with the start date and the length of the diary.
 */

export function parseInput() {
  try {
    const content = fs.readFileSync('./src/input.json', 'utf-8');
    const params = JSON.parse(content);
    params.startDate = new Date(params.startDate);
    return params;
  } catch (e) {
    return {};
  }
}