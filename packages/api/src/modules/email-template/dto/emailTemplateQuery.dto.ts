import { IsOptional, IsString } from 'class-validator';

export class EmailTemplateQueryDto {
  @IsOptional()
  @IsString()
  page?: number;

  @IsOptional()
  @IsString()
  page_limit: number;

  @IsString()
  project_id: string;
}

export class EmailSearchQueryDto {
  @IsString()
  search: string;
}
