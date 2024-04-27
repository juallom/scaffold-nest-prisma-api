import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigRoot } from '#/config/config.root.js';
import { BookModule } from './modules/book/book.module.js';

@Module({
  imports: [
    ConfigRoot,
    RouterModule.register([{ path: 'api', children: [BookModule] }]),
    BookModule,
  ],
})
export class AppModule {}
