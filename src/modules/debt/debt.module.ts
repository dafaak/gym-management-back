import { Module } from '@nestjs/common';
import { DebtService } from './debt.service';
import { DebtController } from './debt.controller';
import { DEBT_PROVIDERS } from './debt.providers';
import { DatabaseModule } from '../../config/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DebtController],
  providers: [...DEBT_PROVIDERS, DebtService],
  exports: [DebtService],
})
export class DebtModule {
}
