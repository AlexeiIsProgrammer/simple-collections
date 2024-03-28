import { IsEnum } from 'class-validator';

export enum SortEnum {
  'ASC' = 'ASC',
  'DESC' = 'DESC',
  'DEFAULT' = '',
}

export class SortDto {
  @IsEnum(SortEnum)
  name: SortEnum;
}
