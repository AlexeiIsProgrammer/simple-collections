import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class CustomFieldEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  collection_id: string;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  state: string;
}
