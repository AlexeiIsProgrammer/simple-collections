import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Action {
  @IsNumber()
  id: string;

  @IsString()
  value: string;

  @IsString()
  field: string;
}

export class UpdateDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Action)
  actions: Action[];
}
