import { Inject, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { PrismaService } from '../../prisma/prisma.service.js';
import { BookSchema } from './dto/book.dto.js';

@Injectable()
export class BookService {
  @Inject(PrismaService)
  private readonly prismaService: PrismaService;

  createBook(book: z.infer<typeof BookSchema>) {
    return this.prismaService.book.create({ data: book });
  }
}
