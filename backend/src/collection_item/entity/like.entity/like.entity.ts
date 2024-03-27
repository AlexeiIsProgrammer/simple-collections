import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CollectionItemEntity } from '../collection_item.entity/collection_item.entity';
import { UserEntity } from 'src/user/entity/user.entity/user.entity';

@Entity('likes')
export class LikeEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

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

  @ManyToMany(() => UserEntity, (user) => user.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Column()
  user_id: number;
}
