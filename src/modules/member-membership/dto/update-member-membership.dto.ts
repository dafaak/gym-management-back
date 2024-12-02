import { Expose } from 'class-transformer';
import { IsDateString, IsOptional } from 'class-validator';

export class UpdateMemberMembershipDto {
  @Expose()
  @IsOptional()
  @IsDateString()
  startDate: Date;

  @Expose()
  @IsOptional()
  @IsDateString()
  endDate: Date;
}
