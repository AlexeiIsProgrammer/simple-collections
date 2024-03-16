import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('collection_item_custom_fields')
export class CollectionItemCustomFieldEntity {
  @Column()
  value: string;

  @PrimaryColumn()
  collection_item_id: number;

  @PrimaryColumn()
  custom_field_id: number;
}
