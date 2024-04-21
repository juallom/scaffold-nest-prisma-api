import { Module } from '@nestjs/common';
import { BookModule } from './modules/book/book.module.js';

@Module({
  imports: [BookModule],
})
export class AppModule {}
