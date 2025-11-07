import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as serverless from 'serverless-http';

let server: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  // CORS 
  app.enableCors({
  preflightContinue: false,
  optionsSuccessStatus: 200,
  origin: [
    "https://makra-depot.vercel.app",
    "https://makra-depot-eobjn8js6-sinthus-projects-be6433bb.vercel.app"
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
  allowedHeaders: "Content-Type, Authorization"
});

  await app.init();
  return app.getHttpAdapter().getInstance();
}

export const handler = async (event, context) => {
  if (!server) {
    const expressApp = await bootstrap();
    server = serverless(expressApp);
  }
  return server(event, context);
};

// If running locally (not Vercel)
if (!process.env.VERCEL) {
  bootstrap().then(app => {
    app.listen(3000);
    console.log('Local server running at http://localhost:3000');
  });
}
