import {
  ConflictException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Borrowing } from './entities/borrowing.entity';
import { Repository } from 'typeorm';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';

@Injectable()
export class BorrowingService {
  constructor(
    @InjectRepository(Borrowing)
    private readonly borrowingRepo: Repository<Borrowing>,
  ) {}
  async create(bookId: number, patronId: number, payload: CreateBorrowingDto) {
    const isBorrowing = await this.borrowingRepo.findOne({
      where: { bookId, patronId },
    });

    if (isBorrowing)
      throw new ConflictException('this book has been borrowing');

    this.borrowingRepo.save({
      bookId,
      patronId,
      returnDate: payload.returnAt,
    });
    return { msg: 'borrowing is created' };
  }

  async update(bookId: number, patronId: number) {
    console.log({ bookId, patronId });
    const checkBorrowing = await this.borrowingRepo.findOne({
      where: { bookId, patronId, isReturned: false },
    });

    if (!checkBorrowing)
      throw new NotAcceptableException('borrowing not found');

    await this.borrowingRepo.save({ ...checkBorrowing, isReturned: true });
    return { status: true };
  }
}
