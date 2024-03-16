import { IsNumber, IsString } from 'class-validator';

export class CustomFieldDto {
  @IsNumber()
  collection_id: string;

  @IsString()
  type: string;

  @IsString()
  name: string;

  @IsString()
  state: string;
}
