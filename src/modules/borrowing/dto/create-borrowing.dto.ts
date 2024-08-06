import { IsISO8601 } from 'class-validator';

export class CreateBorrowingDto {
  @IsISO8601()
  returnAt: Date;
}
