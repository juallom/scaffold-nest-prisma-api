import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ZodFilter } from './zod/zod.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    rawBody: true,
  });
  app.useGlobalFilters(new ZodFilter());
  await app.listen(4000);
}

await bootstrap();
