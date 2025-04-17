import { UserRepository } from '../../domain/repositories/user.repository';
import { RedisService } from '../../infrastructure/cache/redis.service';

interface UpdateUserDTO {
  id: string;
  name: string;
  email: string;
}

export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly redisService: RedisService,
  ) {}

  async execute({ id, name, email }: UpdateUserDTO) {
    const updatedUser = await this.userRepository.update({ id, name, email });

    await this.redisService.del(`users:${id}`);

    await this.redisService.del('users:all');

    return updatedUser;
  }
}
