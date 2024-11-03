import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class RemoveContactsDto {
  @IsString()
  @IsNotEmpty()
  contact_list_id: string;

  @IsArray()
  @IsNotEmpty()
  contact_ids: string[];
}
