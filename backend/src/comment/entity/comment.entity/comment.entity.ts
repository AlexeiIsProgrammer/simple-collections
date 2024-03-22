import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  text: string;

  @Column()
  item_id: number;
}
