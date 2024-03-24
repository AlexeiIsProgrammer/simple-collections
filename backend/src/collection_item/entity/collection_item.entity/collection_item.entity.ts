import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('collection_items')
export class CollectionItemEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  collection_id: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}
