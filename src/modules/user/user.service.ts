import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { pagination } from '../utils/pagination';
import { UpdateProfileDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async createUser(userDate: CreateUserDto) {
    const checkUser = await this.userRepo.findOneBy({ email: userDate.email });

    if (checkUser) throw new ConflictException('user is exist!');

    // hash password
    const hashPassword = await hash(userDate.password, await genSalt());

    await this.userRepo.save({ ...userDate, password: hashPassword });

    return { msg: 'user has been created ^_^' };
  }

  async updateUser(id: number, update: UpdateProfileDto) {
    const user = await this.findOneUser(id);

    return this.userRepo.save({ ...user, ...update });
  }

  async findOneUser(id: number) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) throw new NotFoundException('user not found O_o');

    return user;
  }

  async findWithEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email });

    if (!user) throw new NotFoundException('user not found O_o');

    return user;
  }

  async getAllUsers(page: number = 1, limit: number = 10) {
    const query = this.userRepo.createQueryBuilder('user');

    return pagination<User>(query, page, limit);
  }

  deleteUser(userId: number) {
    return { msg: `will delete this user ${userId}` };
  }
}
