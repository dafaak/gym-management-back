import { Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMemberMembershipDto {
  @Expose()
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @Expose()
  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  member: number;
}
