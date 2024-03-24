import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('collection_items')
export class CollectionItemEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index({ fulltext: true })
  @Column()
  name: string;

  @Column()
  collection_id: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}
