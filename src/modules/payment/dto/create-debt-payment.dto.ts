import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDebtPaymentDto {


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
  amount_paid: number;

  @Expose()
  @IsOptional()
  @IsString()
  details?: string;
}