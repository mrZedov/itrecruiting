import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserRegisterDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  username: string;

  @IsString()
  @MaxLength(100)
  @MinLength(8)
  password: string;

  @IsEmail()
  @IsOptional()
  @MaxLength(256)
  email: string;
}
