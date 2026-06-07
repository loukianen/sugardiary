// A constant for the number of milliseconds in a day
export const MILLISECONDS_PER_DAY = 60*60*24*1000;
export const DAYS_IN_WORK_CYCLE = 4;
export const DIARY_TYPES = [
  'twoperday22work', // two measurements per day with a 2/2 work schedule
  'twoperday', // two measurements per day without limits
  'fiveperweek22work', // five measurements per week with a 2/2 work schedule
];
export const AVAILABLE_MEASUREMENTS_iN_WORK_DAY = [1,5,6]; //can be mesuried b.breakfast, b.dinner, a.dinner