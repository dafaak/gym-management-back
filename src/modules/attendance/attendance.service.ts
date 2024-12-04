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

@Injectable()
export class AttendanceService {
  protected readonly logger = new Logger();
  protected readonly dataSource = dataSourceMySql;
  constructor(
    @Inject(MODELS.attendance)
    private attendanceModel: Model<Attendance>,
    private memberMembershipService: MemberMembershipService,
    private memberService: MemberService,
  ) {}
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

      const attendance: Partial<Attendance> = {
        branch_id: createDto.branchId,
        member_id: createDto.memberId,
        timestamp: new Date(),
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
}
