import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { MODELS } from '../const/models';
import { Model } from 'mongoose';
import { Attendance } from './attendance.interface';
import { RegisterAttendanceDto } from './dto/register-attendance.dto';
import { MemberMembershipService } from '../member-membership/member-membership.service';
import { validateMembershipStatus } from '../../common/utils/functions';
import { ResponseMessageInterface } from '../../common/interface/response-message.interface';
import { MemberService } from '../member/member.service';
import { dataSourceMySql } from '../../config/database/datasource-mysql';
import { MemberMembership } from '../member-membership/member-membership.entity';
import { Branch } from '../branch/branch.entity';
import { SearchAttendanceDto } from './dto/search-attendance.dto';
import { BranchService } from '../branch/branch.service';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc.js';
import * as timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

const tz = 'America/Guayaquil';

@Injectable()
export class AttendanceService {
  protected readonly logger = new Logger();
  protected readonly dataSource = dataSourceMySql;

  constructor(
    @Inject(MODELS.attendance)
    private attendanceModel: Model<Attendance>,
    private memberMembershipService: MemberMembershipService,
    private memberService: MemberService,
    private branchService: BranchService,
  ) {
  }

  async registerAttendance(
    createDto: RegisterAttendanceDto,
  ): Promise<ResponseMessageInterface> {
    try {
      const memberFound = await this.memberService.memberRepository.findOne({
        where: { id: createDto.memberId },
        relations: ['branch', 'memberMembership'],
      });

      if (!memberFound) {
        throw new BadRequestException({
          message: 'MEMBER NOT FOUND',
          status: false,
        });
      }

      if (!memberFound.memberMembership) {
        throw new BadRequestException({
          message: 'MEMBERSHIP NOT FOUND',
          status: false,
        });
      }

      const memberShipFound = memberFound.memberMembership as MemberMembership;

      const isMembershipActive = validateMembershipStatus(
        memberShipFound.startDate,
        memberShipFound.endDate,
      );

      const memberBranch = memberFound.branch as Branch;

      const isValidBranch = this.validateBranch(
        memberBranch.id,
        createDto.branchId,
      );

      const branchFound = await this.branchService.branchRepository.findOne({
        where: { id: createDto.branchId },
        select: ['alias'],
      });

      if (!branchFound) {
        throw new BadRequestException({
          message: 'BRANCH NOT FOUND',
          status: false,
        });
      }

      const now = dayjs();

      const attendance: Partial<Attendance> = {
        branch_id: createDto.branchId,
        member_id: createDto.memberId,
        member_name: memberFound.firstName + ' ' + memberFound.lastName,
        branch_alias: branchFound.alias,
        timestamp: now.toDate(),
        membership_active: isMembershipActive,
        valid_branch: isValidBranch,
      };

      const createdPayment = new this.attendanceModel(attendance);
      await createdPayment.save();
      return {
        message: 'ATTENDANCE REGISTERED',
        status: true,
      };

    } catch (e) {
      this.logger.error(e);
      if (e instanceof BadRequestException) throw e;

      throw new HttpException(
        { message: e.message || 'INTERNAL SERVER ERROR', status: false },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  validateBranch(memberBranch: number, attendanceBranch: number) {
    return memberBranch === attendanceBranch;
  }

  findByParams(searchParams: SearchAttendanceDto) {
    const { branchId, memberId, startDate, endDate } = searchParams;

    const query: any = {};

    if (branchId) {
      query.branch_id = branchId;
    }

    if (memberId) {
      query.member_id = memberId;
    }

    if (startDate && endDate) {
      startDate.setSeconds(0);
      startDate.setMilliseconds(0);
      endDate.setSeconds(59);
      endDate.setMilliseconds(999);
      query.timestamp = { $gte: startDate, $lte: endDate };
    }

    if (startDate && !endDate) {

      const desde = dayjs.tz(dayjs(startDate).format('YYYY-MM-DD'), tz).startOf('day').utc().toDate();


      const hasta = dayjs.tz(dayjs(startDate).format('YYYY-MM-DD'), tz).endOf('day').add(1, 'millisecond').utc().toDate();

      console.log(desde, hasta);

      query.timestamp = {
        $gte: desde,
        $lt: hasta,
      };
    }

    return this.attendanceModel.find(query).exec();
  }

}
