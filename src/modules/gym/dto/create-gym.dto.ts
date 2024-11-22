import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateGymDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @MinLength(2)
  name: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @MinLength(7)
  phone: string;

  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  email?: string;
}
