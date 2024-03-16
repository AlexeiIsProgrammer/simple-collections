import { IsNumber } from 'class-validator';

export class DeleteDto {
  @IsNumber()
  item_id: number;

  @IsNumber()
  tag_id: number;
}
