import { Body, Controller, Inject, Post } from '@nestjs/common';
import { z } from 'zod';
import { ZodPipe } from '../../zod/zod.pipe.js';
import { BookService } from './book.service.js';
import { BookSchema } from './dto/book.dto.js';

@Controller('api/book')
export class BookController {
  @Inject()
  private readonly bookService: BookService;

  @Post('/')
  post(@Body(new ZodPipe(BookSchema)) book: z.infer<typeof BookSchema>) {
    return this.bookService.createBook(book);
  }
}
