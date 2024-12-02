import { IsDateString, IsNumberString, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class SearchPaymentDto {
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
