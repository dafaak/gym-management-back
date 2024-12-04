import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreatePaymentDto } from '../payment/dto/create-payment.dto';
import { PaymentService } from '../payment/payment.service';
import { MembershipService } from '../membership/membership.service';
import { MEMBERSHIP_STATUS } from '../../common/const/membership-status';
import { MemberMembership } from '../member-membership/member-membership.entity';
import * as dayjs from 'dayjs';
import { ResponseMessageInterface } from '../../common/interface/response-message.interface';
import {
  addMonthsToDate,
  validateMembershipStatus,
} from '../../common/utils/functions';
import { dataSourceMySql } from '../../config/database/datasource-mysql';

import { Membership } from '../membership/membership.entity';
import { Member } from '../member/member.entity';

@Injectable()
export class PaymentAndMembershipService {
  protected readonly logger = new Logger();
  protected readonly dataSource = dataSourceMySql;

  constructor(
    private readonly membershipService: MembershipService,
    private readonly paymentService: PaymentService,
  ) {}

  async create(createDto: CreatePaymentDto): Promise<ResponseMessageInterface> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // consultar si existe la membership
      const membershipFound = (await queryRunner.manager.findOne(Membership, {
        where: {
          id: createDto.membership_id,
          branch: createDto.branch_id,
          active: MEMBERSHIP_STATUS.active,
        },
      })) as Membership;

      if (!membershipFound) {
        throw new BadRequestException({
          message: 'MEMBERSHIP NOT FOUND',
          status: false,
        });
      }

      const memberFound = (await queryRunner.manager.findOne(Member, {
        where: {
          id: createDto.member_id,
        },
      })) as Member;

      if (!memberFound) {
        throw new BadRequestException({
          message: 'MEMBER NOT FOUND',
          status: false,
        });
      }

      // consultar si el miembro ya tiene una membresia
      const qb = queryRunner.manager.createQueryBuilder(
        MemberMembership,
        'memberMembership',
      );

      qb.innerJoinAndSelect(
        'memberMembership.member',
        'member',
        'member.id=:memberId',
        { memberId: createDto.member_id },
      );
      const memberMembershipFound = await qb.getOne();

      if (memberMembershipFound) {
        const isMembershipActive = validateMembershipStatus(
          memberMembershipFound.startDate,
          memberMembershipFound.endDate,
        );

        // si la membresia aun esta vigente o es un pago atrasado
        // entonces calcular la nueva fechas de fin
        //actualizar el registro
        if (isMembershipActive || createDto.late_payment) {
          const endDate = dayjs(memberMembershipFound.endDate);
          const endOfMonth = endDate.endOf('month');

          let adjustMonth = false;

          if (endDate.format('YYYY-MM-DD') === endOfMonth.format('YYYY-MM-DD'))
            adjustMonth = true;

          let newEndDate = addMonthsToDate(endDate, membershipFound.duration);

          if (adjustMonth) newEndDate = newEndDate.endOf('month');
          await queryRunner.manager.update(
            MemberMembership,
            memberMembershipFound.id,
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
            membershipFound.duration,
          );
          await queryRunner.manager.update(
            MemberMembership,
            memberMembershipFound.id,
            {
              startDate: startDate.format('YYYY-MM-DD'),
              endDate: newEndDate.format('YYYY-MM-DD'),
            },
          );
        }
      }

      // si no tiene membresia creada
      if (!memberMembershipFound) {
        // entonces fecha de inicio es la actual y calcular la fecha fin
        // crear el registro
        const startDate = dayjs();
        const endDate = startDate.add(membershipFound.duration, 'month');

        const memberMembershipCreated = await queryRunner.manager.save(
          MemberMembership,
          {
            startDate: startDate.format('YYYY-MM-DD'),
            endDate: endDate.format('YYYY-MM-DD'),
            member: createDto.member_id,
          },
        );

        await queryRunner.manager.update(
          Member,
          { id: createDto.member_id },
          {
            memberMembership: memberMembershipCreated.id,
          },
        );
      }

      await this.paymentService.create(createDto);

      await queryRunner.commitTransaction();

      return {
        message: 'PAYMENT REGISTERED',
        status: true,
      };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      if (e instanceof BadRequestException) throw e;

      throw new HttpException(
        { message: e.message || 'INTERNAL SERVER ERROR', status: false },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }
}
