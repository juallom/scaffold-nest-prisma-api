import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { ConfigType } from '#/config/config.root.js';
import { ZodPipe } from '#/zod/zod.pipe.js';
import { BookService } from './book.service.js';
import type { BookDto } from './dto/book.dto.js';
import { BookSchema } from './dto/book.dto.js';

@Controller('books')
export class BookController {
  @Inject()
  private readonly bookService: BookService;
  @Inject()
  private readonly configService: ConfigService<ConfigType>;

  private readonly logger: Logger = new Logger(BookController.name);

  @Get('/')
  getAll(
    @Query('title') title: string | undefined,
    @Query('skip', new ParseIntPipe({ optional: true })) skip = 0,
    @Query('take', new ParseIntPipe({ optional: true })) take = 10,
  ) {
    this.logger.log(BookController.prototype.getAll.name);
    return this.bookService.books({ where: { title: { contains: title } }, skip, take });
  }

  @Get('/:bookId')
  getOne(@Param('bookId') id: string) {
    this.logger.log(BookController.prototype.getOne.name);
    return this.bookService.book(id);
  }

  @Post('/')
  post(@Body(new ZodPipe(BookSchema)) book: BookDto) {
    this.logger.log(BookController.prototype.post.name);
    return this.bookService.createBook(book);
  }

  @Put('/:bookId')
  put(@Param('bookId') id: string, @Body(new ZodPipe(BookSchema)) book: BookDto) {
    this.logger.log(BookController.prototype.put.name);
    return this.bookService.updateBook(id, book);
  }

  @Delete('/:bookId')
  delete(@Param('bookId') id: string) {
    this.logger.log(BookController.prototype.delete.name);
    return this.bookService.deleteBook(id);
  }
}
