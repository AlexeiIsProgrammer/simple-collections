import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class TagEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}
