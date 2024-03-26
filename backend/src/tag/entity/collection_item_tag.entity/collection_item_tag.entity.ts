import { CollectionItemEntity } from 'src/collection_item/entity/collection_item.entity/collection_item.entity';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { TagEntity } from '../tag.entity/tag.entity';

@Entity('collection_item_tags')
export class CollectionItemTagEntity {
  @ManyToOne(
    () => CollectionItemEntity,
    (collectionItemEntity) => collectionItemEntity.id,
  )
  @PrimaryColumn()
  collection_item_id: number;

  @ManyToOne(() => TagEntity, (tagEntity) => tagEntity.id)
  @PrimaryColumn()
  tag_id: number;
}
