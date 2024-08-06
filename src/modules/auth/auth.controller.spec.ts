import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

describe('PatronController', () => {
  let controller: AuthController;
  const USER_REPO_TOKEN = getRepositoryToken(User);
  let service: AuthService;

  let userRepo = Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtService,
        UserService,
        {
          provide: USER_REPO_TOKEN,
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

    controller = module.get<AuthController>(AuthController);
    userRepo = module.get(USER_REPO_TOKEN);
    service = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('user repo should be defined', () => {
    expect(userRepo).toBeDefined();
  });

  describe('register', () => {
    it('should register a user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        password: 'password123',
        email: 'testuser@example.com',
        phone: '+201124370141',
      };

      const result = {
        msg: 'user is created',
      };

      jest.spyOn(service, 'register').mockResolvedValue(result);

      expect(await controller.register(createUserDto)).toEqual(result);
      expect(service.register).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('login', () => {
    it('should login a user', async () => {
      const loginUser: LoginDto = {
        password: 'password123',
        email: 'testuser@example.com',
      };

      const result = {
        accessToken: 'JWT TOKEN',
      };

      jest.spyOn(service, 'login').mockResolvedValue(result);

      expect(await controller.login(loginUser)).toEqual(result);
      expect(service.login).toHaveBeenCalledWith(loginUser);
    });
  });
});
