import { UserRepository } from '../../domain/repositories/user.repository';

interface UpdateUserDTO {
  id: string;
  name: string;
  email: string;
}

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id, name, email }: UpdateUserDTO) {
    const updatedUser = await this.userRepository.update({ id, name, email });
    return updatedUser;
  }
}
