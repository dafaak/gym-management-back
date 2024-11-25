import { Expose } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateMembershipDto {
  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @MinLength(2)
  name?: string;

  @Expose()
  @IsOptional()
  @IsNumber()
  price?: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  duration?: number;

  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  details?: string;
}
