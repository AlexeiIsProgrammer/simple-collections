import { IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MaxLength(20)
  email: string;

  @IsString()
  @MaxLength(20)
  password: string;
}
