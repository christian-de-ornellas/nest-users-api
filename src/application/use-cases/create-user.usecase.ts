import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { RedisService } from '../../infrastructure/cache/redis.service';
import { randomUUID } from 'crypto';

interface CreateUserDTO {
  name: string;
  email: string;
}

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly redisService: RedisService,
  ) {}

  async execute(data: CreateUserDTO): Promise<User> {
    const user = new User(randomUUID(), data.name, data.email);
    await this.userRepository.create(user);

    await this.redisService.del('users:all');

    return user;
  }
}
