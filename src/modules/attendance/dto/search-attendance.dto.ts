import { Expose } from 'class-transformer';
import { IsDateString, IsNumberString, IsOptional } from 'class-validator';

export class SearchAttendanceDto {
  @Expose()
  @IsOptional()
  @IsNumberString()
  memberId: number;

  @Expose()
  @IsOptional()
  @IsDateString()
  startDate: Date;

  @Expose()
  @IsOptional()
  @IsDateString()
  endDate: Date;
}
