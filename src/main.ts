import { NestFactory } from '@nestjs/core';
import { AppModule } from './App/app.module';
import { config } from './Config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.PORT);
}
bootstrap();
