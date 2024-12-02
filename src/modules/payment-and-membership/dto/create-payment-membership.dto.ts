import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { CreatePaymentDto } from '../../payment/dto/create-payment.dto';
import { CreateMemberMembershipDto } from '../../member-membership/dto/create-member-membership.dto';

export class CreatePaymentMembershipDto {
  @Expose()
  @IsNotEmpty()
  membership: CreateMemberMembershipDto;

  @Expose()
  @IsNotEmpty()
  payment: CreatePaymentDto;
}
