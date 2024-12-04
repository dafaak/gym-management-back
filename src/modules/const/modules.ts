import { GymModule } from '../gym/gym.module';
import { BranchModule } from '../branch/branch.module';
import { BranchHoursModule } from '../branch-hours/branch-hours.module';
import { MemberModule } from '../member/member.module';
import { MembershipModule } from '../membership/membership.module';
import { MemberMembershipModule } from '../member-membership/member-membership.module';
import { PaymentModule } from '../payment/payment.module';
import { PaymentAndMembershipModule } from '../payment-and-membership/payment-and-membership.module';
import { AttendanceModule } from '../attendance/attendance.module';
import { AuthModule } from '../auth/auth.module';

export const MODULES = [
  GymModule,
  BranchModule,
  BranchHoursModule,
  MemberModule,
  MembershipModule,
  MemberMembershipModule,
  PaymentModule,
  PaymentAndMembershipModule,
  AttendanceModule,
  AuthModule,
];
