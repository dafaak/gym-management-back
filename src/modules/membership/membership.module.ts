import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { DatabaseModule } from '../../config/database/database.module';
import { MEMBERSHIP_PROVIDERS } from './membership.providers';

@Module({
  imports: [DatabaseModule],
  providers: [MembershipService, ...MEMBERSHIP_PROVIDERS],
  controllers: [MembershipController],
  exports: [MembershipService],
})
export class MembershipModule {}
