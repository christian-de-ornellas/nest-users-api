import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { UserRepositoryPrisma } from '../../infrastructure/database/repositories/user.repository.prisma';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/create-user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  private readonly createUserUseCase: CreateUserUseCase;

  constructor(private readonly userRepository: UserRepositoryPrisma) {
    this.createUserUseCase = new CreateUserUseCase(userRepository);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully!' })
  async create(@Body() body: CreateUserDto) {
    const user = await this.createUserUseCase.execute(body);
    return user;
  }
}
