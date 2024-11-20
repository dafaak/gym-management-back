import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateBranchDto {
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
}
