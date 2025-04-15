import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/prisma.module';
import { UserController } from './interfaces/controllers/user.controller';
import { UserRepositoryPrisma } from './infrastructure/database/repositories/user.repository.prisma';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserRepositoryPrisma],
})
export class AppModule {}