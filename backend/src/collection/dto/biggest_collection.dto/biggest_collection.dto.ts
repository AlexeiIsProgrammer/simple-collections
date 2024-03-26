import { IsNumber, IsString } from 'class-validator';

export class BiggestCollectionDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  image_url: string;

  @IsNumber()
  user_id: number;

  @IsNumber()
  items_count: number;
}
