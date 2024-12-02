import { Module } from '@nestjs/common';
import { MemberMembershipService } from './member-membership.service';
import { MemberMembershipController } from './member-membership.controller';
import { MEMBER_MEMBERSHIP_PROVIDERS } from './member-membership.providers';
import { DatabaseModule } from '../../config/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [MemberMembershipService, ...MEMBER_MEMBERSHIP_PROVIDERS],
  controllers: [MemberMembershipController],
  exports: [MemberMembershipService],
})
export class MemberMembershipModule {}
