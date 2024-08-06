import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BooksPublicController } from './books-public.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController, BooksPublicController],
  providers: [BooksService],
})
export class BooksModule {}
