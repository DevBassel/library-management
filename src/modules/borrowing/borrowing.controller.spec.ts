import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { BorrowingController } from './borrowing.controller';
import { BorrowingService } from './borrowing.service';
import { Borrowing } from './entities/borrowing.entity';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('PatronController', () => {
  let controller: BorrowingController;
  const Borrowing_REPO_TOKEN = getRepositoryToken(Borrowing);
  let service: BorrowingService;

  let userRepo = Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BorrowingController],
      providers: [
        BorrowingService,
        {
          provide: Borrowing_REPO_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
            delete: jest.fn(),
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

    controller = module.get<BorrowingController>(BorrowingController);

    userRepo = module.get(Borrowing_REPO_TOKEN);

    service = module.get(BorrowingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('user repo should be defined', () => {
    expect(userRepo).toBeDefined();
  });

  describe('create borrowing', () => {
    it('should create a borrowing', async () => {
      const createBorrowingDto: CreateBorrowingDto = {
        returnAt: new Date(),
      };

      const result = { msg: 'borrowing is created' };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(5, 4, createBorrowingDto)).toEqual(result);

      expect(service.create).toHaveBeenCalledWith(5, 4, createBorrowingDto);
    });
  });

  describe('return book', () => {
    it('should return book', async () => {
      const result = {
        status: true,
      };

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(4, 5)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(4, 5);
    });
  });
});
