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

  async createPayment(createDto: CreatePaymentDto): Promise<ResponseMessageInterface> {
    try {
      const branchFound = await this.branchService.findById(createDto.branch_id);
      const memberFound = await this.memberService.findById(createDto.member_id);
      const debtFound = await this.debtService.findByMemberId(createDto.member_id);

      console.log({ debtFound });

      if (createDto.is_debt_payment && !debtFound) throw new HttpException({
        message: 'DEBT NOT FOUND',
        status: false,
      }, HttpStatus.BAD_REQUEST);

      if (!createDto.is_debt_payment && createDto.total_amount <= 0) throw new HttpException({
        message: 'TOTAL AMOUNT MUST BE GREATER THAN ZERO',
        status: false,
      }, HttpStatus.BAD_REQUEST);

      let total_amount = createDto.total_amount;
      let total_amount_with_discount = createDto.total_amount - createDto.discount_applied;
      let details = '';

      if (createDto.membership_id) {

        const membershipFound = await this.membershipService.findById(createDto.membership_id);

        if (membershipFound && membershipFound.active === MEMBERSHIP_STATUS.inactive) {

          throw new HttpException(
            { message: 'MEMBERSHIP IS INACTIVE', status: false },
            HttpStatus.BAD_REQUEST,
          );

        }

        if (membershipFound && membershipFound.price) {
          total_amount = membershipFound.price;
        }

        details = membershipFound.name;
      }


      if (!branchFound || !memberFound) {

        throw new HttpException(
          { message: 'BRANCH, MEMBER NOT FOUND', status: false },
          HttpStatus.BAD_REQUEST,
        );

      }

      let debt = 0;

      if (total_amount_with_discount > createDto.amount_paid) {
        debt = total_amount - createDto.amount_paid;
      }

      if (debtFound && Number(debtFound.total_debt) > 0) {
        debt = Number(debtFound.total_debt) + debt;
      }

      if (createDto.is_debt_payment) {
        debt = debt - createDto.amount_paid;
      }

      if (debt > 0) {
        if (!debtFound) {
          await this.debtService.create({
            member: memberFound.id,
            total_debt: debt,
          });
        }

        if (debtFound) {
          await this.debtService.update(debtFound.id, {
            total_debt: debt,
          });
        }

      }


      const createdPayment = new this.paymentModel({
        member_name: memberFound.firstName + ' ' + memberFound.lastName,
        branch_name: branchFound.alias,
        details,
        ...createDto,
        payment_date: new Date(),
        previous_debt: debtFound ? Number(debtFound.total_debt) : 0,
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

  // async createPayment(createDto: CreatePaymentDto): Promise<ResponseMessageInterface> {
  //   const branchFound = await this.branchService.findById(createDto.branch_id);
  //   const memberFound = await this.memberService.findById(createDto.member_id);
  //   const debtFound = await this.debtService.findById(createDto.member_id);
  //
  //   if (!branchFound || !memberFound) {
  //     throw new HttpException(
  //       { message: 'BRANCH OR MEMBER NOT FOUND', status: false },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   let previousDebt = 0;
  //   let newDebt = 0;
  //   if (debtFound && debtFound.total_debt > 0) {
  //     previousDebt = debtFound.total_debt;
  //     newDebt = previousDebt - createDto.amount_paid;
  //   }
  //
  //
  //   const createdPayment = new this.paymentModel({
  //     member_name: memberFound.firstName + ' ' + memberFound.lastName,
  //     branch_name: branchFound.alias,
  //     previous_debt: previousDebt,
  //     new_debt: newDebt,
  //     ...createDto,
  //     payment_date: new Date(),
  //   });
  //   await createdPayment.save();
  //   return { message: 'PAYMENT CREATED', status: true };
  //
  //
  // }

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
