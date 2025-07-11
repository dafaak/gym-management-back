import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class UserCreateDto {

  @Expose()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  userName: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Expose()
  @IsString()
  @IsOptional()
  phone: string;

  @Expose()
  @IsNumber()
  @IsOptional()
  gym?: number;

  @Expose()
  @IsNumber()
  @IsOptional()
  branch?: number;
}