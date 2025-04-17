import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private client = new Redis();

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async set(key: string, value: string, ttl = 60): Promise<void> {
    await this.client.set(key, value, 'EX', ttl);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}