import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigModule, ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.select(ConfigModule).get(ConfigService);

  const origins = configService.get<string>('CORS_DOMAINS').split(',');
  console.log('ORIGINS', origins);
  app.use(helmet());
  app.enableCors({
    credentials: true,
    origin: origins,
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(1335);
}

bootstrap();
