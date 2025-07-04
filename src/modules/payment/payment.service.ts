import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Payment } from './payment.interface';
import { Model } from 'mongoose';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { SearchPaymentDto } from './dto/search-payment.dto';
import { MODELS } from '../const/models';
import { ResponseMessageInterface } from '../../common/interface/response-message.interface';
import { BranchService } from '../branch/branch.service';
import { MemberService } from '../member/member.service';
import { MembershipService } from '../membership/membership.service';
import { DebtService } from '../debt/debt.service';
import { MEMBERSHIP_STATUS } from '../../common/const/membership-status';

@Injectable()
export class PaymentService {
  protected readonly logger = new Logger();

  constructor(
    @Inject(MODELS.payment)
    private paymentModel: Model<Payment>,
    private readonly branchService: BranchService,
    private readonly memberService: MemberService,
    private readonly membershipService: MembershipService,
    private readonly debtService: DebtService,
  ) {
  }

  async createMembershipPayment(createDto: CreatePaymentDto): Promise<ResponseMessageInterface> {
    try {
      const branchFound = await this.branchService.findById(createDto.branch_id);
      const memberFound = await this.memberService.findById(createDto.member_id);
      const membershipFound = await this.membershipService.findById(createDto.membership_id);
      const debtFound = await this.debtService.findById(createDto.member_id);

      if (membershipFound && membershipFound.active === MEMBERSHIP_STATUS.inactive) {
        throw new HttpException(
          { message: 'MEMBERSHIP IS INACTIVE', status: false },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!branchFound || !memberFound) {
        throw new HttpException(
          { message: 'BRANCH, MEMBER NOT FOUND', status: false },
          HttpStatus.BAD_REQUEST,
        );
      }

      let debt = 0;
      let total_amount = 0;

      if (membershipFound && membershipFound.price) {
        total_amount = membershipFound.price;
      }

      if (createDto.discount_applied > 0) {
        total_amount = total_amount  - createDto.discount_applied;
      }

      if (total_amount > createDto.amount_paid) {
        debt = total_amount - createDto.amount_paid;
      }

      if (debtFound && debtFound.total_debt > 0) {
        debt = debtFound.total_debt + debt;
      }

      console.log(debt);

      if (debt > 0) {
        if (!debtFound) {
          await this.debtService.create({
            member_id: createDto.member_id,
            total_debt: debt,
          });
        }

        if (debtFound) {
          await this.debtService.update(debtFound.id, {
            member_id: createDto.member_id,
            total_debt: debt,
          });
        }

      }


      const createdPayment = new this.paymentModel({
        member_name: memberFound.firstName + ' ' + memberFound.lastName,
        branch_name: branchFound.alias,
        membership_name: membershipFound.name,
        ...createDto,
        payment_date: new Date(),
        previous_debt: debtFound ? debtFound.total_debt : 0,
        new_debt: debt,
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

  async createPayment(createDto: CreatePaymentDto): Promise<ResponseMessageInterface> {
    const branchFound = await this.branchService.findById(createDto.branch_id);
    const memberFound = await this.memberService.findById(createDto.member_id);
    const debtFound = await this.debtService.findById(createDto.member_id);

    if (!branchFound || !memberFound) {
      throw new HttpException(
        { message: 'BRANCH OR MEMBER NOT FOUND', status: false },
        HttpStatus.BAD_REQUEST,
      );
    }
    let previousDebt = 0;
    let newDebt = 0;
    if (debtFound && debtFound.total_debt > 0) {
      previousDebt = debtFound.total_debt;
      newDebt = previousDebt - createDto.amount_paid;
    }


    const createdPayment = new this.paymentModel({
      member_name: memberFound.firstName + ' ' + memberFound.lastName,
      branch_name: branchFound.alias,
      previous_debt: previousDebt,
      new_debt: newDebt,
      ...createDto,
      payment_date: new Date(),
    });
    await createdPayment.save();
    return { message: 'PAYMENT CREATED', status: true };


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
