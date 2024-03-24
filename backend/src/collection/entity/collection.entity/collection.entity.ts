import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  user_id: number;

  @Index({ fulltext: true })
  @Column()
  category: string;
}
