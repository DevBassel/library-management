import { Type } from 'class-transformer';
import { IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 24)
  username: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  @Type(() => String)
  phone: string;

  @IsString()
  @Length(6, 16)
  @Type(() => String)
  password: string;
}
