import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { MODULES } from './modules/modules';

@Module({
  imports: [DatabaseModule, ...MODULES],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
