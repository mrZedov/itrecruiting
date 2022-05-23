import { IsString } from 'class-validator';
import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class Users {
  @ObjectIdColumn()
  _id: ObjectID;

  @IsString()
  @Column()
  username: string;

  @IsString()
  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  registerDate: Date;
}
