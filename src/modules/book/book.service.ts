import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '#/prisma/prisma.service.js';
import type { BookDto } from './dto/book.dto.js';

@Injectable()
export class BookService {
  @Inject(PrismaService)
  private readonly prismaService: PrismaService;

  books(...args: Parameters<typeof this.prismaService.book.findMany>) {
    return this.prismaService.book.findMany(...args);
  }

  book(id: string) {
    return this.prismaService.book.findUniqueOrThrow({ where: { id } });
  }

  updateBook(id: string, data: Partial<BookDto>) {
    return this.prismaService.book.update({ where: { id }, data });
  }

  createBook(book: BookDto) {
    return this.prismaService.book.create({ data: book });
  }

  deleteBook(id: string) {
    return this.prismaService.book.delete({ where: { id } });
  }
}
