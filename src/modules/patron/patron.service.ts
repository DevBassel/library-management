import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatronDto } from './dto/create-patron.dto';
import { UpdatePatronDto } from './dto/update-patron.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patron } from './entities/patron.entity';
import { Repository } from 'typeorm';
import { pagination } from '../utils/pagination';

@Injectable()
export class PatronService {
  constructor(
    @InjectRepository(Patron) private readonly patronRepo: Repository<Patron>,
  ) {}
  create(createPatronDto: CreatePatronDto) {
    return this.patronRepo.save(createPatronDto);
  }

  findAll(page: number, limit: number) {
    const QueryBulider = this.patronRepo.createQueryBuilder('patron');
    return pagination(QueryBulider, page, limit);
  }

  async findOne(id: number) {
    const patron = await this.patronRepo.findOneBy({ id });

    if (!patron) throw new NotFoundException('patron not found O_O');

    return patron;
  }

  async update(id: number, updatePatronDto: UpdatePatronDto) {
    const patron = await this.findOne(id);

    if (!patron) throw new NotFoundException('patron not found O_o');

    return this.patronRepo.save({ ...patron, ...updatePatronDto });
  }

  remove(id: number) {
    return this.patronRepo.delete({ id });
  }
}
