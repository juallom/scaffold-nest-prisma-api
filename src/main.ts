import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ConfigType } from '#/config/config.root.js';
import { PrismaFilter } from '#/prisma/prisma.filter.js';
import { AppModule } from './app.module.js';
import { ZodFilter } from './zod/zod.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    rawBody: true,
  });
  const configService = app.get(ConfigService<ConfigType>);
  app.useGlobalFilters(new ZodFilter());
  app.useGlobalFilters(new PrismaFilter());
  await app.listen(configService.get('PORT') || 4000);
}

await bootstrap();
