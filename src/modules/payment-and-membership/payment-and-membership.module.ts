import { Module } from '@nestjs/common';
import { PaymentAndMembershipService } from './payment-and-membership.service';
import { PaymentAndMembershipController } from './payment-and-membership.controller';
import { PaymentModule } from '../payment/payment.module';
import { MembershipModule } from '../membership/membership.module';
import { MemberMembershipModule } from '../member-membership/member-membership.module';

@Module({
  imports: [PaymentModule, MembershipModule, MemberMembershipModule],
  providers: [PaymentAndMembershipService],
  controllers: [PaymentAndMembershipController],
})
export class PaymentAndMembershipModule {}
