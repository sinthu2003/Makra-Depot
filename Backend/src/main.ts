import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // pipes
  app.useGlobalPipes (new ValidationPipe());

  if (process.env.VERCEL) {
    const serverless = require('serverless-http');
    return serverless(app.getHttpAdapter().getInstance());
  }

  await app.listen(3000);
}
bootstrap();
