import { Test, TestingModule } from '@nestjs/testing';
import { PatronController } from './patron.controller';
import { PatronService } from './patron.service';
import { Patron } from './entities/patron.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { UpdatePatronDto } from './dto/update-patron.dto';
import { CreatePatronDto } from './dto/create-patron.dto';

const mockPatron = {
  name: 'patron name',
  phone: '+201121310395',
  email: 'bassel@gmail.com',
  id: 7,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockAllPatron = {
  data: [mockPatron],
  total: 6,
  pages: 1,
  page: 1,
  limit: 10,
};

describe('PatronController', () => {
  let controller: PatronController;
  let service: PatronService;
  const PATRON_REPO_TOKEN = getRepositoryToken(Patron);

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
    service = module.get<PatronService>(PatronService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('patron repo should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return pagination of all books', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(mockAllPatron);

      expect(await controller.findAll(1, 10)).toEqual(mockAllPatron);
      expect(service.findAll).toHaveBeenCalledWith(1, 10);
    });
  });

  describe('findOne', () => {
    it('should return a single book', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockPatron);

      expect(await controller.findOne('14')).toEqual(mockPatron);
      expect(service.findOne).toHaveBeenCalledWith(14);
    });
  });

  describe('create a patron', () => {
    it('should create a patron', async () => {
      const createPatronDto: CreatePatronDto = {
        name: 'bassel',
        phone: '+201124370141',
        email: 'bassel@gmail.com',
      };

      const result = {
        id: 1,
        ...createPatronDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createPatronDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createPatronDto);
    });
  });

  describe('delete a patron', () => {
    it('should delete a patron', async () => {
      const deletemoc = {
        raw: [],
        affected: 1,
      };
      jest.spyOn(service, 'remove').mockResolvedValue(deletemoc);

      expect(await controller.remove('13')).toEqual(deletemoc);
      expect(service.remove).toHaveBeenCalledWith(13);
    });
  });

  describe('update a patron', () => {
    it('should update a patron', async () => {
      const updatePatronDto: UpdatePatronDto = {};

      jest.spyOn(service, 'update').mockResolvedValue(mockPatron);

      expect(await controller.update('13', updatePatronDto)).toEqual(
        mockPatron,
      );
      expect(service.update).toHaveBeenCalledWith(13, updatePatronDto);
    });
  });
});
