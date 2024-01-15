import { Global, Module } from '@nestjs/common';
import { PUB_SUB } from '../constants/injection-tokens';
import { PubSub } from 'graphql-subscriptions';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { serialize, deserialize } from 'bson';

@Global()
@Module({
  providers: [
    {
      provide: PUB_SUB,
      useFactory: (configService: ConfigService) => {
        if (configService.get('NODE_ENV') === 'production') {
          const options = {
            host: 'chatter-redis.ghk4hw.ng.0001.use1.cache.amazonaws.com',
            port: 6379,
          };
          return new RedisPubSub({
            publisher: new Redis(options),
            subscriber: new Redis(options),
            serializer: (source) => serialize(source).toString(),
            deserializer: (source) => {
              if (typeof source === 'string') {
                return JSON.parse(source);
              }
              return deserialize(source);
            },
          });
        }
        return new PubSub();
      },
      inject: [ConfigService],
    },
  ],
  exports: [PUB_SUB],
})
export class PubSubModule {}
