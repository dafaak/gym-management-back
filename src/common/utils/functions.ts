import * as dayjs from 'dayjs';

export function isDateInRange(
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs,
  date: dayjs.Dayjs,
) {
  if (date.diff(startDate) >= 0 && date.diff(endDate) <= 0) {
    return true;
  }

  return false;
}

export function addMonthsToDate(date: dayjs.Dayjs, months: number) {
  return date.add(months, 'month');
}
