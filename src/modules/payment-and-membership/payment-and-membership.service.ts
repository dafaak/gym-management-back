import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreatePaymentDto } from '../payment/dto/create-payment.dto';
import { MemberMembershipService } from '../member-membership/member-membership.service';
import { PaymentService } from '../payment/payment.service';
import { MembershipService } from '../membership/membership.service';
import { MEMBERSHIP_STATUS } from '../../common/const/membership-status';
import { MemberMembership } from '../member-membership/member-membership.entity';
import * as dayjs from 'dayjs';
import { ResponseMessageInterface } from '../../common/interface/response-message.interface';
import { addMonthsToDate, isDateInRange } from '../../common/utils/functions';
import { dataSourceMySql } from '../../config/database/datasource-mysql';

@Injectable()
export class PaymentAndMembershipService {
  protected readonly logger = new Logger();

  constructor(
    private readonly membershipService: MembershipService,
    private readonly memberMembershipService: MemberMembershipService,
    private readonly paymentService: PaymentService,
  ) {}

  async create(createDto: CreatePaymentDto): Promise<ResponseMessageInterface> {
    try {
      // consultar si existe la membership
      const membershipFound = await this.membershipService.findByParams({
        id: createDto.membership_id,
        branchId: createDto.branch_id,
        active: MEMBERSHIP_STATUS.active,
      });

      if (membershipFound.length === 0) {
        throw new BadRequestException('MEMBERSHIP NOT FOUND');
      }

      // consultar si el miembro ya tiene una membresia
      const memberMembershipFound =
        await this.memberMembershipService.findByParams({
          memberId: createDto.member_id,
        });

      if (memberMembershipFound.length === 1) {
        const isMembershipActive = this.isMembershipActive(
          memberMembershipFound[0],
        );

        // si la membresia aun esta vigente o es un pago atrasado
        // entonces calcular la nueva fechas de fin
        //actualizar el registro
        if (isMembershipActive || createDto.late_payment) {
          const endDate = dayjs(memberMembershipFound[0].endDate);
          const endOfMonth = endDate.endOf('month');

          let adjustMonth = false;

          if (endDate.format('YYYY-MM-DD') === endOfMonth.format('YYYY-MM-DD'))
            adjustMonth = true;

          let newEndDate = addMonthsToDate(
            endDate,
            membershipFound[0].duration,
          );

          if (adjustMonth) newEndDate = newEndDate.endOf('month');
          await this.memberMembershipService.update(
            memberMembershipFound[0].id,
            {
              endDate: newEndDate.format('YYYY-MM-DD'),
            },
          );
        }

        // si la membresia esta caducada y no es un pago atrasado
        // entonces fecha de inicio es la actual y calcular la fecha fin
        //actualizar el registro

        if (!isMembershipActive && !createDto.late_payment) {
          const startDate = dayjs();
          const newEndDate = addMonthsToDate(
            startDate,
            membershipFound[0].duration,
          );
          await this.memberMembershipService.update(
            memberMembershipFound[0].id,
            {
              startDate: startDate.format('YYYY-MM-DD'),
              endDate: newEndDate.format('YYYY-MM-DD'),
            },
          );
        }
      }

      // si no tiene membresia creada
      if (memberMembershipFound.length === 0) {
        // entonces fecha de inicio es la actual y calcular la fecha fin
        // crear el registro
        const startDate = dayjs();
        const endDate = startDate.add(membershipFound[0].duration, 'month');
        await this.memberMembershipService.create({
          startDate: startDate.format('YYYY-MM-DD'),
          endDate: endDate.format('YYYY-MM-DD'),
          member: createDto.member_id,
        });
      }
      this.logger.log(
        `Membership updated with params: ${JSON.stringify(createDto)}`,
      );

      await this.paymentService.create(createDto);

      return {
        message: 'PAYMENT REGISTERED',
        status: true,
      };
    } catch (e) {
      if (e instanceof BadRequestException) throw e;

      throw new HttpException(
        { message: e.message || 'INTERNAL SERVER ERROR', status: false },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  isMembershipActive(memberMembership: MemberMembership) {
    const startDate = dayjs(memberMembership.startDate);

    const endDate = dayjs(memberMembership.endDate);

    const today = dayjs();
    return isDateInRange(startDate, endDate, today);
  }
}
