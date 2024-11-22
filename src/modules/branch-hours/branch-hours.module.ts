import { Module } from '@nestjs/common';
import { BranchHoursController } from './branch-hours.controller';
import { BranchHoursService } from './branch-hours.service';
import { DatabaseModule } from '../../config/database/database.module';
import { BRANCH_HOURS_PROVIDERS } from './branch-hours.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BranchHoursController],
  providers: [...BRANCH_HOURS_PROVIDERS, BranchHoursService],
})
export class BranchHoursModule {}
