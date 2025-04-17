import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // ou substitua por um domínio específico, ex: 'http://localhost:3000'
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('Users API')
    .setDescription('API para cadastro de usuários')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
