import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,POST,PUT,DELETE', // You can specify the methods you want to allow
    allowedHeaders: 'Content-Type,Authorization',
  });
  await app.listen(3012);
}
bootstrap();
