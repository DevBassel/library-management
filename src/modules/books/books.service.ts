import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { pagination } from '../utils/pagination';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
  ) {}
  create(createBookDto: CreateBookDto) {
    return this.bookRepo.save(createBookDto);
  }

  async findAll(page: number, limit: number) {
    const QyeryBuilder = this.bookRepo.createQueryBuilder('book');

    const books = await pagination(QyeryBuilder, page, limit);

    return books;
  }

  async findOne(id: number) {
    const book = await this.bookRepo.findOneBy({ id });

    if (!book) throw new NotFoundException('book not found O_o');

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.findOne(id);

    return this.bookRepo.save({ ...book, ...updateBookDto });
  }

  remove(id: number) {
    return this.bookRepo.delete({ id });
  }
}
