import { TagEntity } from 'src/tag/entity/tag.entity/tag.entity';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class CollectionItemEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  collection_id: string;

  @Column()
  tags: TagEntity[];
}
