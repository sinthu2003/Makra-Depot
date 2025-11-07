import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as serverless from 'serverless-http';

async function createApp() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: [
      "https://makra-depot.vercel.app",
      "http://localhost:3000"
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization'
  });

  await app.init();
  return app;
}

let server: any;

export const handler = async (event: any, context: any) => {
  if (!server) {
    const app = await createApp();
    const expressApp = app.getHttpAdapter().getInstance();
    server = serverless(expressApp);
  }
  return server(event, context);
};

// For local dev
if (!process.env.VERCEL) {
  async function bootstrapLocal() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
    console.log('LOCAL API running → http://localhost:3000');
  }
  bootstrapLocal();
}