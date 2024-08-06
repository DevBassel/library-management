import { IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator';

export class CreatePatronDto {
  @IsString()
  @Length(2, 24)
  name: string;

  @IsPhoneNumber()
  phone: string;

  @IsEmail()
  email: string;
}
