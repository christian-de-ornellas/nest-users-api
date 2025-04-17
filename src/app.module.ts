import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/prisma.module';
import { UserController } from './interfaces/controllers/user.controller';
import { UserRepositoryPrisma } from './infrastructure/database/repositories/user.repository.prisma';
import { RedisService } from './infrastructure/cache/redis.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserRepositoryPrisma, RedisService],
})
export class AppModule {}
