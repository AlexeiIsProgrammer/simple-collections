import { IsNumber, IsString } from 'class-validator';

export class CollectionItemDto {
  @IsString()
  name: string;

  @IsNumber()
  collection_id: number;
}
