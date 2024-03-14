import { IsString, MaxLength } from 'class-validator';

export class UserDto {
  @IsString()
  @MaxLength(20)
  name: string;

  @IsString()
  @MaxLength(20)
  email: string;

  @IsString()
  @MaxLength(20)
  password: string;

  @IsString()
  @MaxLength(20)
  repeatPassword: string;
}
