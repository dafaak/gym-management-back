import { Inject, Injectable } from '@nestjs/common';
import { Payment } from './payment.interface';
import { Model } from 'mongoose';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { SearchPaymentDto } from './dto/search-payment.dto';
import { MODELS } from '../const/models';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(MODELS.payment)
    private paymentModel: Model<Payment>,
  ) {}

  async create(createDto: CreatePaymentDto) {
    const createdPayment = new this.paymentModel(createDto);
    return createdPayment.save();
  }

  async getPaymentsByMemberAndDateRange(searchParams: SearchPaymentDto) {
    try {
      const filter = {};

      if (searchParams.memberId) {
        filter['member_id'] = searchParams.memberId;
      }

      if (searchParams.startDate && searchParams.endDate) {
        filter['payment_date'] = {
          $gte: searchParams.startDate,
          $lte: searchParams.endDate,
        };
      }

      const payments = await this.paymentModel.find(filter);
      return payments;
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }
  }
}
