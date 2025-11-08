import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as serverless from 'serverless-http';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as cors from 'cors';

const expressApp = express();

// Apply CORS at the Express level
expressApp.use(cors({
  origin: 'https://makra-depot.vercel.app',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  
  // Also enable CORS in NestJS for double protection
  app.enableCors({
    origin: 'https://makra-depot.vercel.app',
    credentials: true
  });
  
  await app.init();
};

bootstrap();

export const handler = serverless(expressApp);