import { IsNumber } from 'class-validator';
import { TagDto } from '../tag.dto/tag.dto';

export class CreateDto {
  @IsNumber()
  item_id: number;

  tag: TagDto;
}
