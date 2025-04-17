import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { RedisService } from '../../infrastructure/cache/redis.service';

export class GetUserByIdUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly redisService: RedisService,
  ) {}

  async execute(id: string): Promise<User | null> {
    const cacheKey = `users:${id}`;

    const cached = await this.redisService.get(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      return new User(parsed.id, parsed.name, parsed.email);
    }

    const user = await this.userRepository.findById(id);
    if (user) {
      await this.redisService.set(cacheKey, JSON.stringify(user), 60); // cache por 60s
    }

    return user;
  }
}
