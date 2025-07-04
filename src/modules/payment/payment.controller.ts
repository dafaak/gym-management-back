import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { SearchPaymentDto } from './dto/search-payment.dto';
import { CreateDebtDto } from '../debt/dto/create-debt.dto';
import { CreateDebtPaymentDto } from './dto/create-debt-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {
  }

  @Get()
  findByParams(@Query() searchParams: SearchPaymentDto) {
    return this.paymentService.getPaymentsByMemberAndDateRange(searchParams);
  }

  @Post()
  create(@Body() createDto: CreateDebtPaymentDto) {
    return this.paymentService.createDebtPayment(createDto);
  }

  // @Put(':id')
  // @UsePipes(ValidationPipe)
  // update(
  //   @Param() params: IdParamDto,
  //   @Body() updateDto: UpdateMemberMembershipDto,
  // ) {
  //   return this.paymentService.update(params.id, updateDto);
  // }
  //
  // @Delete(':id')
  // delete(@Param() params: IdParamDto) {
  //   return this.paymentService.delete(params.id);
  // }
}
