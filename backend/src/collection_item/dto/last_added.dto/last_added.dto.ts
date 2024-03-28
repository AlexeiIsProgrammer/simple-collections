import { IsNumber, IsString } from 'class-validator';

export class LastAddedDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  collection_name: string;

  @IsString()
  collection_id: string;

  @IsString()
  username: string;

  @IsString()
  image_url: string;

  @IsNumber()
  user_id: number;
}
