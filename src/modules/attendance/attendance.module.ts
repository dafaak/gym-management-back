import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { DatabaseModule } from '../../config/database/database.module';
import { ATTENDANCE_PROVIDERS } from './attendance.providers';
import { MemberMembershipModule } from '../member-membership/member-membership.module';
import { MemberModule } from '../member/member.module';

@Module({
  imports: [DatabaseModule, MemberMembershipModule, MemberModule],
  providers: [AttendanceService, ...ATTENDANCE_PROVIDERS],
  controllers: [AttendanceController],
})
export class AttendanceModule {}
