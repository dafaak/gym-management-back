import { IsNotEmpty, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';

export class RegisterAttendanceDto {
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  memberId: number;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  branchId: number;
}
