import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBranchDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @MinLength(2)
  address: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @MinLength(7)
  phone: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  gymId: number;

  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  @MinLength(1)
  lat?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  @MinLength(1)
  long?: string;
}
