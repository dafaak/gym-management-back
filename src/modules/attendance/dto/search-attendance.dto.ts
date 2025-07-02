import { IsDate, IsDateString, IsISO8601, IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchAttendanceDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  branchId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  memberId?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;

}