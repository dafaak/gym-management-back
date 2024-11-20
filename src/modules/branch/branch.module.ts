import { Module } from '@nestjs/common';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { DatabaseModule } from '../../config/database/database.module';
import { BRANCH_PROVIDERS } from './gym.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BranchController],
  providers: [BranchService, ...BRANCH_PROVIDERS],
})
export class BranchModule {}
