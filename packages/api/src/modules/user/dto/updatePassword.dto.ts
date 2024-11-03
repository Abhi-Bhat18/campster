import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @MinLength(8, {
    message: 'Current password must be at least 8 characters long',
  })
  current_password: string;

  @IsString()
  @MinLength(8, { message: 'New password must be at least 8 characters long' })
  new_password: string;

  @IsString()
  @MinLength(8, {
    message: 'Confirm password must be at least 8 characters long',
  })
  confirm_password: string;
}
