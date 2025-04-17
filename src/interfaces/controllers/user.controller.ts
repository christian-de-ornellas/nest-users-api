import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { UserRepositoryPrisma } from '../../infrastructure/database/repositories/user.repository.prisma';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '@prisma/client';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.usecase';
import { GetAllUserUseCase } from '../../application/use-cases/get-all-user.usercase';
import { GetUserByIdUseCase } from '../../application/use-cases/get-user-by-id.usercase';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.usecase';
import { RedisService } from '../../infrastructure/cache/redis.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  private readonly createUserUseCase: CreateUserUseCase;
  private readonly updateUserUseCase: UpdateUserUseCase;
  private readonly getAllUserUseCase: GetAllUserUseCase;
  private readonly getUserByIdUseCase: GetUserByIdUseCase;
  private readonly deleteUserUseCase: DeleteUserUseCase;

  constructor(
    private readonly userRepository: UserRepositoryPrisma,
    redisService: RedisService,
  ) {
    this.createUserUseCase = new CreateUserUseCase(userRepository);
    this.updateUserUseCase = new UpdateUserUseCase(userRepository);
    this.getAllUserUseCase = new GetAllUserUseCase(
      userRepository,
      redisService,
    );
    this.getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
    this.deleteUserUseCase = new DeleteUserUseCase(userRepository);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully!' })
  async create(@Body() body: CreateUserDto) {
    const user = await this.createUserUseCase.execute(body);
    return user;
  }

  @Get()
  @ApiOperation({ summary: 'Lista de usuários' })
  async list() {
    const users: User[] = await this.getAllUserUseCase.execute();
    return users;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Listar usuário por id' })
  async findById(@Param('id') id: string) {
    const user = await this.getUserByIdUseCase.execute(id);
    return user;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar usuário' })
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = await this.updateUserUseCase.execute({
      id,
      name: body.name,
      email: body.email,
    });
    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Deletar usuário' })
  @ApiResponse({ status: 204, description: 'Usuário deletado com sucesso' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteUserUseCase.execute(id);
  }
}
