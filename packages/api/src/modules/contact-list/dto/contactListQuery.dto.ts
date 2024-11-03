import { IsOptional, IsString } from 'class-validator';

export class ContactListQueryDto {
  @IsOptional()
  @IsString()
  page?: number;

  @IsOptional()
  @IsString()
  page_limit: number;

  @IsString()
  project_id: string;
}
