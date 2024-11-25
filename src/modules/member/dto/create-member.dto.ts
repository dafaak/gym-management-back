import { Expose } from 'class-transformer';
import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MEMBERSHIP_STATUS } from '../../../common/const/membership-status';

export class CreateMemberDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(2)
  ci: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(2)
  firstName: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(2)
  lastName: string;

  @Expose()
  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @MinLength(7)
  phone: string;

  @Expose()
  @IsOptional()
  @IsIn([MEMBERSHIP_STATUS.active, MEMBERSHIP_STATUS.unactive])
  @IsNumber()
  membershipStatus?: MEMBERSHIP_STATUS;

  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  email?: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  branch: number;
}
