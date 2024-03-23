import { IsString } from 'class-validator';
import { CollectionItemEntity } from 'src/collection_item/entity/collection_item.entity/collection_item.entity';

export class CollectionItemsByTagDto extends CollectionItemEntity {
  @IsString()
  collection_name: string;

  @IsString()
  user_id: string;
}
