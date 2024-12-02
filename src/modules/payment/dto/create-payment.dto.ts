import { Expose } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePaymentDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  member_id: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  membership_id: number;

  @Expose()
  @IsNotEmpty()
  @IsDateString()
  payment_date: Date;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  amount_paid: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  discount_applied: number;

  @Expose()
  @IsOptional()
  @IsString()
  details?: string;
}
