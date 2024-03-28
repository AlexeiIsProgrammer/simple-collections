import { IsArray, IsNumber, IsString } from 'class-validator';
import { CustomFieldDto } from '../custom-field.dto/custom-field.dto';

export class CollectionDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  image_url: string;

  @IsNumber()
  user_id: number;

  @IsString()
  category: string;

  @IsArray()
  customFields: Omit<CustomFieldDto, 'collection_id'>[];
}
