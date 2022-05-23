import { IsOptional } from 'class-validator';
import { ObjectID } from 'typeorm';
import { Users } from '../entity/users.entity';

export class UserDataDto {
  id: ObjectID;

  username: string;

  @IsOptional()
  email: string;

  user: Users;
}
