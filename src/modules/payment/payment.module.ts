import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PAYMENT_PROVIDERS } from './payment.providers';
import { DatabaseModule } from '../../config/database/database.module';
import { BranchModule } from '../branch/branch.module';
import { MemberModule } from '../member/member.module';
import { MembershipModule } from '../membership/membership.module';
import { DebtModule } from '../debt/debt.module';

@Module({
  imports: [DatabaseModule, BranchModule, MemberModule, MembershipModule, DebtModule],
  providers: [PaymentService, ...PAYMENT_PROVIDERS],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {
}
