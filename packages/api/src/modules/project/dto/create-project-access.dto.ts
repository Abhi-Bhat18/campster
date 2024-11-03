import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProjectAccessDto {
  @IsString()
  @IsNotEmpty()
  project_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsNumber()
  @Min(1)
  role_id: number;
}
