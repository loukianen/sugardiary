// A constant for the number of milliseconds in a day
export const DAYS_IN_WEEK = 7;
export const MILLISECONDS_PER_DAY = 60*60*24*1000;
export const DAYS_IN_WORK_CYCLE = 4;
export const DIARY_TYPES = [
  'twoperday22work', // two measurements per day with a 2/2 work schedule
  'twoperday', // two measurements per day without limits
  'fiveperweek22work', // five measurements per week with a 2/2 work schedule
  'fiveperweek', // five measurements per week without limits
];
export const AVAILABLE_MEASUREMENTS_IN_WORK_DAY = [1,5,6]; //can be mesuried b.breakfast, b.dinner, a.dinner
export const NUMBER_OF_MEASUREMENTS_IN_NIGHT_WORK_DAY = 4; //can be mesuried b.breakfast, a.breakfast, b.dinner, a.dinner
export const NUMBER_OF_MEASUREMENTS_IN_OTHER_DAY = 6; //all mesurement