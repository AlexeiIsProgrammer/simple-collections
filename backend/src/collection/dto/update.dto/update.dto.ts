import { IsString } from 'class-validator';

export class UpdateDto {
  @IsString()
  field: string;

  @IsString()
  value: string;
}
