import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateMembershipDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @MinLength(2)
  name: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  branch: number;

  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  details?: string;
}
