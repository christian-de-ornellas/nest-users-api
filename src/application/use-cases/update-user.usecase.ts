import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

interface UpdateUserDTO {
  id: string;
  name: string;
  email: string;
}

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id, name, email }: UpdateUserDTO) {
    const user = new User(id, name, email);
    const updatedUser = await this.userRepository.update(user);
    return updatedUser;
  }
}
