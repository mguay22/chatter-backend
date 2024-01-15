import { Global, Module } from '@nestjs/common';
import { PUB_SUB } from '../constants/injection-tokens';
import { PubSub } from 'graphql-subscriptions';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [
    {
      provide: PUB_SUB,
      useFactory: (configService: ConfigService) => {
        if (configService.get('NODE_ENV') === 'production') {
          return new RedisPubSub({
            connection: {
              host: 'chatter-redis.ghk4hw.ng.0001.use1.cache.amazonaws.com',
              port: 6379,
            },
          });
        }
        return new PubSub();
      },
    },
  ],
  exports: [PUB_SUB],
})
export class PubSubModule {}
