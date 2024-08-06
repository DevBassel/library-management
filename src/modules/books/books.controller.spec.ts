import { Test, TestingModule } from '@nestjs/testing';
import { BooksPublicController } from './books-public.controller';
import { BooksService } from './books.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksController } from './books.controller';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

const mockBook = {
  id: 14,
  title: 'is booke',
  author: 'me and me',
  publicationYear: 2005,
  ISBN: '978-3-16-148410-0',
  createdAt: new Date('2024-08-06T15:40:07.690Z'),
  updatedAt: new Date('2024-08-06T15:40:07.690Z'),
};
const mockAllBooks = {
  data: [mockBook],
  total: 6,
  pages: 1,
  page: 1,
  limit: 10,
};
describe('BooksPublicController', () => {
  let controllerPublic: BooksPublicController;
  let controller: BooksController;
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksPublicController, BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
            reset: jest.fn(),
          },
        },
      ],
    }).compile();

    controllerPublic = module.get<BooksPublicController>(BooksPublicController);
    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('public controller should be defined', () => {
    expect(controllerPublic).toBeDefined();
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return pagination of all books', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(mockAllBooks);
      expect(await controllerPublic.findAll(1, 10)).toEqual(mockAllBooks);
      expect(service.findAll).toHaveBeenCalledWith(1, 10);
    });
  });

  describe('findOne', () => {
    it('should return a single book', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockBook);
      expect(await controllerPublic.findOne('14')).toEqual(mockBook);
      expect(service.findOne).toHaveBeenCalledWith(14);
    });
  });

  describe('create a book', () => {
    it('should create a book', async () => {
      const createBookDto: CreateBookDto = {
        title: 'New Book',
        author: 'Author Name',
        publicationYear: 2021,
        ISBN: '123-456-789',
      };

      const result = {
        id: 1,
        ...createBookDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createBookDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createBookDto);
    });
  });

  describe('delete a book', () => {
    it('should delete a book', async () => {
      const deletemoc = {
        raw: [],
        affected: 1,
      };
      jest.spyOn(service, 'remove').mockResolvedValue(deletemoc);

      expect(await controller.remove('13')).toEqual(deletemoc);
      expect(service.remove).toHaveBeenCalledWith(13);
    });
  });

  describe('update a book', () => {
    it('should update a book', async () => {
      const updateBookDto: UpdateBookDto = {
        title: 'Updated Book Title',
        author: 'Updated Author',
        publicationYear: 2021,
        ISBN: '123-456-789',
      };

      const updatedBook: Book = {
        id: 13,
        title: 'Updated Book Title',
        author: 'Updated Author',
        publicationYear: 2021,
        ISBN: '123-456-789',
        createdAt: new Date('2024-08-01T10:00:00.000Z'),
        updatedAt: new Date('2024-08-06T15:40:07.690Z'),
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedBook);

      expect(await controller.update('13', updateBookDto)).toEqual(updatedBook);
      expect(service.update).toHaveBeenCalledWith(13, updateBookDto);
    });
  });
});
