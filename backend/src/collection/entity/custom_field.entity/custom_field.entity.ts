import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CollectionEntity } from '../collection.entity/collection.entity';

export enum TypeEnum {
  'boolean' = 'boolean',
  'string' = 'string',
  'number' = 'number',
  'text' = 'text',
  'date' = 'date',
}

export enum StateEnum {
  'active' = 'active',
  'blocked' = 'blocked',
  'hidden' = 'hidden',
}

@Entity('custom_fields')
export class CustomFieldEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => CollectionEntity, (collection) => collection.id)
  @Column()
  collection_id: number;

  @Column()
  type: TypeEnum;

  @Column()
  name: string;

  @Column()
  state: StateEnum;
}
