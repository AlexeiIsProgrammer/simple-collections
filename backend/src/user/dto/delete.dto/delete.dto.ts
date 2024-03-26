import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';

class Action {
  @IsNumber()
  id: number;
}

export class DeleteDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Action)
  ids: Action[];
}
