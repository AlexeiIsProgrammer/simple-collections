import { IsArray } from 'class-validator';
import { CollectionItemEntity } from 'src/collection_item/entity/collection_item.entity/collection_item.entity';
import { CollectionItemCustomFieldEntity } from 'src/collection_item/entity/collection_item_custom_field.entity/collection_item_custom_field.entity';

export class CreateDto extends CollectionItemEntity {
  @IsArray()
  customFields: CollectionItemCustomFieldEntity[];
}
