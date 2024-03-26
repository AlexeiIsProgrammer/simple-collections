import { CustomFieldEntity } from 'src/collection/entity/custom_field.entity/custom_field.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { CollectionItemEntity } from '../collection_item.entity/collection_item.entity';

@Entity('collection_item_custom_fields')
export class CollectionItemCustomFieldEntity {
  @Column()
  value: string;

  @ManyToOne(
    () => CollectionItemEntity,
    (collectionItemEntity) => collectionItemEntity.id,
  )
  @PrimaryColumn()
  collection_item_id: number;

  @ManyToOne(
    () => CustomFieldEntity,
    (customFieldEntity) => customFieldEntity.id,
  )
  @PrimaryColumn()
  custom_field_id: number;
}
