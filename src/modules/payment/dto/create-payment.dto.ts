import { Expose, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePaymentDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  branch_id: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  member_id: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  membership_id: number;

  @Expose()
  @IsOptional()
  @Type(() => Boolean)
  late_payment: boolean;

  @Expose()
  @IsOptional()
  @IsNumber()
  total_amount: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  amount_paid: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  discount_applied: number;

  @Expose()
  @IsOptional()
  @IsString()
  details?: string;
}
