import { CollectionItemEntity } from 'src/collection_item/entity/collection_item.entity/collection_item.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Index({ fulltext: true })
  @Column()
  text: string;

  @ManyToOne(
    () => CollectionItemEntity,
    (collectionItem) => collectionItem.id,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @Column()
  item_id: number;

  @Column()
  role: string;
}
