import { UserEntity } from 'src/user/entity/user.entity/user.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('collections')
export class CollectionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index({ fulltext: true })
  @Column()
  name: string;

  @Index({ fulltext: true })
  @Column()
  description: string;

  @Column()
  image_url: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @Column()
  user_id: number;

  @Index({ fulltext: true })
  @Column()
  category: string;
}
