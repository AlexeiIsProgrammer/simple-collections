import { Entity, PrimaryColumn } from 'typeorm';

@Entity('collection_item_tags')
export class CollectionItemTagEntity {
  @PrimaryColumn()
  collection_item_id: number;

  @PrimaryColumn()
  tag_id: number;
}
