import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CustomFieldEntity } from '../custom-field.entity/custom-field.entity';

@Entity('collections')
export class CollectionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image_url: string;

  @Column()
  user_id: number;

  @Column()
  category: string;

  @Column()
  customFields: CustomFieldEntity[];
}
