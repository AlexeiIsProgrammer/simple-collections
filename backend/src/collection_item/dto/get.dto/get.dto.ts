import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';
import {
  StateEnum,
  TypeEnum,
} from 'src/collection/entity/custom_field.entity/custom_field.entity';
import { CollectionItemEntity } from 'src/collection_item/entity/collection_item.entity/collection_item.entity';

class CollectionItemCustomField {
  @IsNumber()
  custom_field_id: number;

  @IsEnum(TypeEnum)
  type: TypeEnum;

  @IsString()
  name: string;

  @IsString()
  value: string;

  @IsEnum(StateEnum)
  state: StateEnum;
}

export class GetDto extends CollectionItemEntity {
  @IsArray()
  customFields: CollectionItemCustomField[];
}
