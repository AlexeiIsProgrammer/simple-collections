import { IsNumber, IsString } from 'class-validator';

export class ChangeDto {
  @IsNumber()
  item_id: number;

  @IsNumber()
  tag_id: number;

  @IsString()
  name: string;
}
