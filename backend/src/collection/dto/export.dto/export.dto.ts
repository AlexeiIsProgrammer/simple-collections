import { IsArray } from 'class-validator';
import { CollectionEntity } from 'src/collection/entity/collection.entity/collection.entity';
import { CollectionItemEntity } from 'src/collection_item/entity/collection_item.entity/collection_item.entity';
import { CustomFieldDto } from '../custom-field.dto/custom-field.dto';

class ExportCollectionItem extends CollectionItemEntity {
  @IsArray()
  customFields: CustomFieldDto[];
}

export class ExportCollection extends CollectionEntity {
  @IsArray()
  collectionItems: ExportCollectionItem[];
}
