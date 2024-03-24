import { IsNumber, IsString } from 'class-validator';

export class BiggestCollectionDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  image_url: string;

  @IsString()
  user_id: string;

  @IsNumber()
  items_count: number;
}
