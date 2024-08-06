import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

describe('BooksService', () => {
  let service: BooksService;
  const BOOKE_REPO_TOKEN = getRepositoryToken(Book);
  let bookRepo = Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: BOOKE_REPO_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    bookRepo = module.get<Book>(BOOKE_REPO_TOKEN) as any;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('book repo be defined', () => {
    expect(bookRepo).toBeDefined();
  });
});
