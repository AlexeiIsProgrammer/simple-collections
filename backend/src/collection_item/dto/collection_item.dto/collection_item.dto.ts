import { IsArray, IsNumber, IsString } from 'class-validator';
import { TagEntity } from 'src/tag/entity/tag.entity/tag.entity';

export class CollectionItemDto {
  @IsString()
  name: string;

  @IsNumber()
  collection_id: string;

  @IsArray()
  tags: TagEntity[];
}
