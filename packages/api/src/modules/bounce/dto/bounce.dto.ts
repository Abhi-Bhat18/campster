import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BounecDto {
  @IsString()
  @IsNotEmpty()
  mail: string;

  @IsNumber()
  dsn_smtp_code: number;
}
