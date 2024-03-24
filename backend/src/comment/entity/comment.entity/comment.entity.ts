import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Index({ fulltext: true })
  @Column()
  text: string;

  @Column()
  item_id: number;

  @Column()
  role: string;
}
