import { Injectable, Inject, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisPubSubService implements OnModuleDestroy {
  constructor(
    @Inject('REDIS_PUBLISHER') private readonly publisher: Redis,
    @Inject('REDIS_SUBSCRIBER') private readonly subscriber: Redis,
  ) {}

  async publish(channel: string, message: string): Promise<void> {
    await this.publisher.publish(channel, message);
  }

  async subscribe(
    channel: string,
    callback: (message: string) => void,
  ): Promise<void> {
    await this.subscriber.subscribe(channel);
    this.subscriber.on('message', (chan, message) => {
      if (chan === channel) {
        callback(message);
      }
    });
  }

  async unsubscribe(channel: string): Promise<void> {
    await this.subscriber.unsubscribe(channel);
  }

  onModuleDestroy() {
    this.publisher.quit();
    this.subscriber.quit();
  }
}
