import { UserRepository } from '../../domain/repositories/user.repository';
import { RedisService } from '../../infrastructure/cache/redis.service';

export class DeleteUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly redisService: RedisService,
  ) {}

  async execute(id: string): Promise<void> {
    await this.userRepository.delete(id);

    await this.redisService.del(`users:${id}`);

    await this.redisService.del('users:all');
  }
}
