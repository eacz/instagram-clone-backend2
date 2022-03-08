import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger()
  const port = process.env.PORT || 4000
  const app = await NestFactory.create(AppModule);
  
  //TODO: configure origins
  app.enableCors()

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(port);

  logger.log(`App running on port ${port}`)
}
bootstrap();
