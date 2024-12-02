import { Body, Controller, Post } from '@nestjs/common';
import { CreatePaymentDto } from '../payment/dto/create-payment.dto';
import { PaymentAndMembershipService } from './payment-and-membership.service';

@Controller('payment-and-membership')
export class PaymentAndMembershipController {
  constructor(
    private readonly paymentAndMembershipService: PaymentAndMembershipService,
  ) {}

  @Post()
  create(@Body() createDto: CreatePaymentDto) {
    return this.paymentAndMembershipService.create(createDto);
  }
}
