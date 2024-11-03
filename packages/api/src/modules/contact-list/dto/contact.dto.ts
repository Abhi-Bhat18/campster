import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty({ message: 'First name must not be empty' })
  @MinLength(2, { message: 'First name must contain at least 2 characters' })
  first_name: string;

  @IsString()
  last_name?: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email must not be empty' })
  email: string;

  @IsString()
  contact?: string;

  @IsObject()
  attributes?: object;

  @IsString()
  @IsNotEmpty({ message: 'Contact List can be empty' })
  contact_list_id: string;
}
