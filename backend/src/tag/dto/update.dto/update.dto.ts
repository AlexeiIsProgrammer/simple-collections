import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export enum ActionTypeEnum {
  'create' = 'create',
  'update' = 'update',
  'delete' = 'delete',
}

class Action {
  @IsEnum(ActionTypeEnum)
  type?: ActionTypeEnum;

  @IsNumber()
  id?: number;

  @IsString()
  name?: string;
}

export class UpdateDto {
  @IsNumber()
  id: number;

  @IsArray()
  @ValidateNested({ each: true })
  actions: Action[];
}
