import { chooseOneFromAmount, chooseTwoFromAmount, getEmptyRecord, getTomorrowDate } from "./utils.js";
import { DAYS_IN_WEEK, NUMBER_OF_MEASUREMENTS_IN_OTHER_DAY } from "./consts.js";

export default function ({ startDate, diaryLength } ) {
  let curDate = startDate;
  const dairy = [];
  let dayOfWeek = startDate.getDay() === 0 ? DAYS_IN_WEEK : startDate.getDay();
  let daysWithoutMeasuring = chooseTwoFromAmount(DAYS_IN_WEEK);

  for (let i = 0; i < diaryLength; i += 1) {
    // record = [date, before breakfast, after breakfast, b.lunch, a.lunch, b.dinner, a.dinner]
    const record = getEmptyRecord(curDate);
    
    dairy.push(record);
    curDate = getTomorrowDate(curDate);
  }
    
  for (let i = 0; i < dairy.length; i += 1) {
    if (!daysWithoutMeasuring.includes(dayOfWeek)) {
      // day without limitation
      const selectedIndex = chooseOneFromAmount(NUMBER_OF_MEASUREMENTS_IN_OTHER_DAY);
      dairy[i][selectedIndex] = '.';
    }

    if (dayOfWeek === DAYS_IN_WEEK) {
      dayOfWeek = 1;
      daysWithoutMeasuring = chooseTwoFromAmount(DAYS_IN_WEEK);
    } else {
      dayOfWeek += 1;
    }
  }

  return dairy;
}