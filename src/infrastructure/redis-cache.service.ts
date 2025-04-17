import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheService } from './cache.service';

@Injectable()
export class RedisCacheService implements CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get<T>(key: string): Promise<T | null> {
    return (await this.cache.get<T>(key)) ?? null;
  }

  async set<T>(key: string, value: T, ttl = 60): Promise<void> {
    await this.cache.set(key, value, ttl);
  }

  async del(key: string): Promise<void> {
    await this.cache.del(key);
  }
}