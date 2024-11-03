import { IsString, IsIn, MinLength, MaxLength } from 'class-validator';

export class UpdateContactListDto {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @IsString()
  @MinLength(4)
  description: string;

  @IsIn(['single', 'double'])
  email_opt_in: 'single' | 'double';

  @IsIn(['public', 'private'])
  email_type: 'public' | 'private';
}
