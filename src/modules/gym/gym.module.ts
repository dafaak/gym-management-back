import { Module } from '@nestjs/common';
import { GymController } from './gym.controller';
import { GymService } from './gym.service';
import { DatabaseModule } from '../../config/database/database.module';
import { GYM_PROVIDERS } from './gym.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [GymController],
  providers: [...GYM_PROVIDERS, GymService],
})
export class GymModule {}
