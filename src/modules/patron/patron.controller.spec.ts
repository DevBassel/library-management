import { Test, TestingModule } from '@nestjs/testing';
import { PatronController } from './patron.controller';
import { PatronService } from './patron.service';
import { Patron } from './entities/patron.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('PatronController', () => {
  let controller: PatronController;
  const PATRON_REPO_TOKEN = getRepositoryToken(Patron);

  let patronRepo = Repository<Patron>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatronController],
      providers: [
        PatronService,
        {
          provide: PATRON_REPO_TOKEN,
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

    controller = module.get<PatronController>(PatronController);
    patronRepo = module.get(PATRON_REPO_TOKEN);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('patron repo should be defined', () => {
    expect(patronRepo).toBeDefined();
  });
});
