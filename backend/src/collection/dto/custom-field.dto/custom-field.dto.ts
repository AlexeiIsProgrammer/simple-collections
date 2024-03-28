import { IsEnum, IsNumber, IsString } from 'class-validator';
import {
  StateEnum,
  TypeEnum,
} from 'src/collection/entity/custom_field.entity/custom_field.entity';

export class CustomFieldDto {
  @IsNumber()
  collection_id: number;

  @IsEnum(TypeEnum)
  type: TypeEnum;

  @IsString()
  name: string;

  @IsEnum(StateEnum)
  state: StateEnum;
}
