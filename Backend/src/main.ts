import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as serverless from 'serverless-http';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const expressApp = express();

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  
  // Enable CORS with more specific configuration
  app.enableCors({
    origin: ["https://makra-depot.vercel.app", "http://localhost:3000"], // Add multiple origins if needed
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization, X-Requested-With, Accept",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  });
  
  await app.init();
};

bootstrap();

// Create serverless handler with CORS support
export const handler = serverless(expressApp, {
  binary: ['image/*', 'application/pdf'],
  request: function(request, event, context) {
    // You can modify the request here if needed
  },
  response: function(response, event, context) {
    // Ensure CORS headers are set in response
    response.setHeader('Access-Control-Allow-Origin', 'https://makra-depot.vercel.app');
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  }
});