import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Payment } from './payment.interface';
import { Model } from 'mongoose';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { SearchPaymentDto } from './dto/search-payment.dto';
import { MODELS } from '../const/models';
import { ResponseMessageInterface } from '../../common/interface/response-message.interface';

@Injectable()
export class PaymentService {
  protected readonly logger = new Logger();

  constructor(
    @Inject(MODELS.payment)
    private paymentModel: Model<Payment>,
  ) {}

  async create(createDto: CreatePaymentDto): Promise<ResponseMessageInterface> {
    try {
      const createdPayment = new this.paymentModel({
        ...createDto,
        payment_date: new Date(),
      });
      await createdPayment.save();
      return { message: 'PAYMENT CREATED', status: true };
    } catch (e) {
      this.logger.error(
        `Error in create method: payload = ${JSON.stringify(createDto)}`,
        e.stack,
      );
      throw new HttpException(
        { message: e.message || 'INTERNAL SERVER ERROR', status: false },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
