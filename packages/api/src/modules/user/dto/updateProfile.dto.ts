import { IsEmail, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  contact: string;
}
