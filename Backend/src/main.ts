import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as serverless from 'serverless-http';

async function createApp() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS with proper configuration
  app.enableCors({
    origin: [
      "https://makra-depot.vercel.app",
      "http://localhost:3000"
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  });

  await app.init();
  return app;
}

let cachedServer: any;

async function bootstrapServer() {
  const app = await createApp();
  return app.getHttpAdapter().getInstance();
}

export const handler = async (event: any, context: any) => {
  if (!cachedServer) {
    const expressApp = await bootstrapServer();
    cachedServer = serverless(expressApp);
  }
  return cachedServer(event, context);
};

// For local development
if (process.env.NODE_ENV === 'development') {
  async function bootstrapLocal() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: [
        "https://makra-depot.vercel.app",
        "http://localhost:3000"
      ],
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
    });
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
    console.log('LOCAL API running → http://localhost:3000');
  }
  bootstrapLocal();
}