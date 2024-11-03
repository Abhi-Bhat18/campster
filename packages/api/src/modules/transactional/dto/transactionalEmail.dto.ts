import { IsEmail, IsOptional, IsString, IsObject } from 'class-validator';

export class TransactionalEmailDto {
  @IsEmail()
  to_email: string;

  @IsEmail()
  from_email: string;

  @IsEmail()
  @IsOptional()
  reply_to: string;

  @IsString()
  subject: string;

  @IsString()
  event_name: string;

  @IsString()
  content_html: string;

  @IsString()
  content_text: string;

  @IsObject()
  @IsOptional()
  headers: string;

  @IsOptional()
  template_id?: string;

  @IsObject()
  @IsOptional()
  template_data: object;
}
