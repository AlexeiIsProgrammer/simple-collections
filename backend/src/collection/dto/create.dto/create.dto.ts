import { IsArray } from 'class-validator';
import { CustomFieldDto } from '../custom-field.dto/custom-field.dto';
import { CollectionEntity } from 'src/collection/entity/collection.entity/collection.entity';

export class CreateDto extends CollectionEntity {
  @IsArray()
  customFields: CustomFieldDto[];
}
