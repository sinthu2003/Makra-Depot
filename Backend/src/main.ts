import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import serverless from 'serverless-http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      "https://makra-depot.vercel.app",
      "http://localhost:3000" // for local frontend testing
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization"
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.init();
  return serverless(app.getHttpAdapter().getInstance());
}

export const handler = async (event: any, context: any) => {
  const expressApp = await bootstrap();
  return expressApp(event, context);
};

// For local dev
if (!process.env.VERCEL) {
  bootstrap().then(app => {
    console.log('LOCAL API running → http://localhost:3000');
  });
}
