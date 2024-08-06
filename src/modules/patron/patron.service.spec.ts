import { Test, TestingModule } from '@nestjs/testing';
import { PatronService } from './patron.service';
import { Patron } from './entities/patron.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PatronService', () => {
  let service: PatronService;
  const PATRON_REPO_TOKEN = getRepositoryToken(Patron);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      ],
    }).compile();

    service = module.get<PatronService>(PatronService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
