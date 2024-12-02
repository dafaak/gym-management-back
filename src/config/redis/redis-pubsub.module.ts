import { Module, Global } from '@nestjs/common';
import { RedisPubSubService } from './redis-pubsub.service';
import Redis from 'ioredis';
import { envs } from '../envs';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_PUBLISHER',
      useFactory: () => {
        return new Redis({
          host: envs.redisHost || 'localhost',
          port: envs.redisPort || 6379,
        });
      },
    },
    {
      provide: 'REDIS_SUBSCRIBER',
      useFactory: () => {
        return new Redis({
          host: envs.redisHost || 'localhost',
          port: envs.redisPort || 6379,
        });
      },
    },
    RedisPubSubService,
  ],
  exports: ['REDIS_PUBLISHER', 'REDIS_SUBSCRIBER', RedisPubSubService],
})
export class RedisPubSubModule {}
