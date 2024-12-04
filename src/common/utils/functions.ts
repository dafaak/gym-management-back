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

export function validateMembershipStatus(
  membershipStartDate: string,
  membershipEndDate: string,
) {
  const startDate = dayjs(membershipStartDate);

  const endDate = dayjs(membershipEndDate);

  const today = dayjs();
  return isDateInRange(startDate, endDate, today);
}
