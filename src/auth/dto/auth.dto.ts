import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthLoginDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  username: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  @MinLength(8)
  password: string;
}
