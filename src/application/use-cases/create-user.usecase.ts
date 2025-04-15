import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { randomUUID } from 'crypto';

interface CreateUserDTO {
  name: string;
  email: string;
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: CreateUserDTO): Promise<User> {
    const user = new User(randomUUID(), data.name, data.email);
    await this.userRepository.create(user);
    return user;
  }
}
