import { Gym } from '../gym/gym.entity';
import { Branch } from '../branch/branch.entity';
import { BranchHours } from '../branch-hours/branch-hours.entity';
import { Member } from '../member/member.entity';
import { Membership } from '../membership/membership.entity';
import { MemberMembership } from '../member-membership/member-membership.entity';
import { Debt } from '../debt/debt.entity';
import { User } from '../auth/user.entity';

export const ENTITIES = [
  Gym,
  Branch,
  BranchHours,
  Member,
  Membership,
  MemberMembership,
  Debt,
  User
];
