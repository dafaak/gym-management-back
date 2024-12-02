import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PAYMENT_PROVIDERS } from './payment.providers';
import { DatabaseModule } from '../../config/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [PaymentService, ...PAYMENT_PROVIDERS],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
