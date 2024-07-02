import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule, {});

  app.setGlobalPrefix('/api/v1/');

  app.enableCors({
    origin: '*',
  });

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();
