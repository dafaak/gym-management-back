import { GymModule } from '../gym/gym.module';
import { BranchModule } from '../branch/branch.module';
import { BranchHoursModule } from '../branch-hours/branch-hours.module';
import { MemberModule } from '../member/member.module';

export const MODULES = [
  GymModule,
  BranchModule,
  BranchHoursModule,
  MemberModule,
];
