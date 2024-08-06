import { IsISBN, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(3)
  author: string;

  @IsNumber()
  publicationYear: number;

  @IsISBN()
  ISBN: string;
}
