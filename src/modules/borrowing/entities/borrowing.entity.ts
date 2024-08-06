import { Book } from 'src/modules/books/entities/book.entity';
import { Patron } from 'src/modules/patron/entities/patron.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Borrowing {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, { createForeignKeyConstraints: false })
  book: Book;

  @Column()
  bookId: number;

  @ManyToOne(() => Patron, { createForeignKeyConstraints: false })
  patron: Patron;

  @Column()
  patronId: number;

  @Column({ default: false })
  isReturned: boolean;

  @Column()
  returnDate: Date;

  @CreateDateColumn()
  BorrowedAt: Date;
}
