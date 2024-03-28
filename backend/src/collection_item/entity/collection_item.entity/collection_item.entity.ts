import { CollectionEntity } from 'src/collection/entity/collection.entity/collection.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('collection_items')
export class CollectionItemEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index({ fulltext: true })
  @Column()
  name: string;

  @ManyToOne(() => CollectionEntity, (collection) => collection.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Column()
  collection_id: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}
