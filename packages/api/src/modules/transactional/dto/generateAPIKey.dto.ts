import { IsDateString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class NewAPIKeyDto {
  @Transform(({ value }) => (value ? new Date(value) : value))
  @IsDateString()
  @IsOptional()
  expires_at?: Date;
}
