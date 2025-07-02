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
import { BranchService } from '../branch/branch.service';
import { MemberService } from '../member/member.service';
import { MembershipService } from '../membership/membership.service';

@Injectable()
export class PaymentService {
  protected readonly logger = new Logger();

  constructor(
    @Inject(MODELS.payment)
    private paymentModel: Model<Payment>,
    private readonly branchService: BranchService,
    private readonly memberService: MemberService,
    private readonly membershipService: MembershipService,
  ) {
  }

  async create(createDto: CreatePaymentDto): Promise<ResponseMessageInterface> {
    try {

      const branchFound = await this.branchService.findById(createDto.branch_id);
      const memberFound = await this.memberService.findById(createDto.member_id);
      const membershipFound = await this.membershipService.findById(createDto.membership_id);

      if (!branchFound || !memberFound) {
        throw new HttpException(
          { message: 'BRANCH OR MEMBER NOT FOUND', status: false },
          HttpStatus.BAD_REQUEST,
        );
      }

      const createdPayment = new this.paymentModel({
        member_name: memberFound.firstName + ' ' + memberFound.lastName,
        branch_name: branchFound.alias,
        membership_name: membershipFound?.name ?? undefined,
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
          $gte: new Date(`${searchParams.startDate} 00:00:00`),
          $lte: new Date(`${searchParams.endDate} 23:59:59`),
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
