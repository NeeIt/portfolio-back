import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: 'http://localhost:4200',
    credentials: true,
  });
  const configService = app.get(ConfigService);
  await app.listen(3000);
}
bootstrap();
