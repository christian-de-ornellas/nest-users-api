// src/core/user/use-cases/get-all-users.usecase.ts
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { RedisService } from '../../infrastructure/cache/redis.service';

export class GetAllUserUseCase {
  private readonly cacheKey = 'users:all';

  constructor(
    private readonly userRepository: UserRepository,
    private readonly redisService: RedisService,
  ) {}

  async execute(): Promise<User[]> {
    const cached = await this.redisService.get(this.cacheKey);

    if (cached) {
      const parsed: User[] = JSON.parse(cached);
      return parsed.map((u) => new User(u.id, u.name, u.email));
    }

    const users = await this.userRepository.findAll();
    await this.redisService.set(this.cacheKey, JSON.stringify(users), 60); // TTL de 60s

    return users;
  }
}
