import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('likes')
export class LikeEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  item_id: number;

  @Column()
  user_id: number;
}
