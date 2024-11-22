import { Expose } from 'class-transformer';
import { IsIn, IsOptional, IsString, Matches } from 'class-validator';
import { WEEK_DAYS } from '../../../common/const/week-days';
import { HOUR_FORMAT } from '../../../common/const/hour-format';

export class UpdateBranchHoursDto {
  @Expose()
  @IsOptional()
  @IsString()
  @IsIn([
    WEEK_DAYS.monday,
    WEEK_DAYS.tuesday,
    WEEK_DAYS.wednesday,
    WEEK_DAYS.thrusday,
    WEEK_DAYS.thrusday,
    WEEK_DAYS.saturday,
    WEEK_DAYS.sunday,
  ])
  dayOfTheWeek?: WEEK_DAYS;

  @Expose()
  @IsOptional()
  @IsString()
  @Matches(HOUR_FORMAT, {
    message: 'time must be in the format HH:MM (24-hour format)',
  })
  timeRangeStart?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @Matches(HOUR_FORMAT, {
    message: 'time must be in the format HH:MM (24-hour format)',
  })
  timeRangeEnd?: string;
}
