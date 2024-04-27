import { Module } from '@nestjs/common';
import { PrismaModule } from '#/prisma/prisma.module.js';
import { BookController } from './book.controller.js';
import { BookService } from './book.service.js';

@Module({
  imports: [PrismaModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
