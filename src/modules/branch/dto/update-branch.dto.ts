import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateBranchDto {
  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @MinLength(2)
  address?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @MinLength(2)
  alias?: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @MinLength(7)
  phone?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  @MinLength(7)
  lat?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  long?: string;

  @Expose()
  @IsOptional()
  @IsNumber()
  branch?: number;
}
