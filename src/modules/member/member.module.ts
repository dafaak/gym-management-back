import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { DatabaseModule } from '../../config/database/database.module';
import { MEMBERS_PROVIDERS } from './member.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [MemberController],
  providers: [...MEMBERS_PROVIDERS, MemberService],
})
export class MemberModule {}
