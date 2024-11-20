import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateGymDto {
  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @MinLength(2)
  name?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  @MinLength(7)
  phone?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  email?: string;
}
