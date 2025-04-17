import { Global, Module } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import { TOKENS } from '../application/tokens';
import * as redisStore from 'cache-manager-ioredis';
import { CacheModule } from '@nestjs/cache-manager';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore,
        host: 'localhost',
        port: 6379,
        ttl: 60 * 10, // 10 minutos
      }),
    }),
  ],
  providers: [
    {
      provide: TOKENS.CACHE_SERVICE,
      useClass: RedisCacheService,
    },
  ],
  exports: [TOKENS.CACHE_SERVICE],
})
export class RedisCacheModule {}
