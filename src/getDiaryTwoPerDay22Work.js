import { chooseTwoFromAmount, getEmptyRecord, getTomorrowDate } from "./utils.js";
import { DAYS_IN_WORK_CYCLE, NUMBER_OF_MEASUREMENTS_IN_NIGHT_WORK_DAY, NUMBER_OF_MEASUREMENTS_IN_OTHER_DAY } from "./consts.js";

export default function ({ startDate, diaryLength } ) {
  let curDate = startDate;
  const dairy = [];

  for (let i = 0; i < diaryLength; i += 1) {
    // record = [date, before breakfast, after breakfast, b.lunch, a.lunch, b.dinner, a.dinner]
    const record = getEmptyRecord(curDate);
    
    dairy.push(record);
    curDate = getTomorrowDate(curDate);
  }
    
  dairy.forEach((el, i) => {
    const dayInWorkCycle = i % DAYS_IN_WORK_CYCLE;
    let selectedIndexes = [];
    if (dayInWorkCycle === 0) { // day work day use before breckfast or dinner and after dinner only
      const firstIndex = Math.random() < 0.5 ? 1 : 5;
      el[firstIndex] = '.';
      el[6] = '.';
    } else if (dayInWorkCycle === 1) { // night work day don't use dinner
      selectedIndexes = chooseTwoFromAmount(NUMBER_OF_MEASUREMENTS_IN_NIGHT_WORK_DAY);
    } else { // other days without limitation
      selectedIndexes = chooseTwoFromAmount(NUMBER_OF_MEASUREMENTS_IN_OTHER_DAY);
    }
    selectedIndexes.forEach((index) => {
      el[index] = '.';
    });
  });

  return dairy;
}