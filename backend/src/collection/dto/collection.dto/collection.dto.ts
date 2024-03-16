import { IsArray, IsNumber, IsString } from 'class-validator';
import { CustomFieldEntity } from 'src/collection/entity/custom-field.entity/custom-field.entity';

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
  customFields: CustomFieldEntity[];
}
