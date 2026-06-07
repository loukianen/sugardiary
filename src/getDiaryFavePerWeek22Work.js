import { chooseOneFromAmount, chooseTwoFromAmount, getEmptyRecord, getTomorrowDate } from "./utils.js";
import { AVAILABLE_MEASUREMENTS_iN_WORK_DAY, DAYS_IN_WORK_CYCLE } from "./consts.js";

export default function ({ startDate, diaryLength } ) {
  let curDate = startDate;
  const dairy = [];
  let dayOfWeek = startDate.getDay() === 0 ? 7 : startDate.getDay();
  let daysWithoutMeasuring = chooseTwoFromAmount(7);

  for (let i = 0; i < diaryLength; i += 1) {
    // record = [date, before breakfast, after breakfast, b.lunch, a.lunch, b.dinner, a.dinner]
    const record = getEmptyRecord(curDate);
    
    dairy.push(record);
    curDate = getTomorrowDate(curDate);
  }
    
  for (let i = 0; i < dairy.length; i += 1) {
    if (!daysWithoutMeasuring.includes(dayOfWeek)) {
      const dayInWorkCycle = i % DAYS_IN_WORK_CYCLE;
      let selectedIndex;
      if (dayInWorkCycle === 0) { // day work day use before breckfast or dinner and after dinner only
        selectedIndex = chooseOneFromAmount(AVAILABLE_MEASUREMENTS_iN_WORK_DAY);
      } else if (dayInWorkCycle === 1) { // night work day don't use dinner
        selectedIndex = chooseOneFromAmount(4);
      } else { // other days without limitation
        selectedIndex = chooseOneFromAmount(6);
      }
      dairy[i][selectedIndex] = '.';
    }

    if (dayOfWeek === 7) {
      dayOfWeek = 1;
      daysWithoutMeasuring = chooseTwoFromAmount(7);
    } else {
      dayOfWeek += 1;
    }
  }

  return dairy;
}