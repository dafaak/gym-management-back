import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateGymDto {
  @IsString()
  @MaxLength(100)
  @MinLength(2)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsPhoneNumber()
  @MaxLength(20)
  @MinLength(7)
  @IsNotEmpty()
  phone: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  email: string;
}
