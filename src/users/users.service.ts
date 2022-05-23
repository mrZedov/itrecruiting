import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { UserRegisterDto } from './dto/user_register.dto';
import { ObjectId } from 'bson';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async findById(id): Promise<Users> {
    const user = await this.userRepository.findOne({
      _id: ObjectId(id),
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = process.env.USER_SALT || '';
    return crypto
      .createHash('sha256')
      .update(`${password}${salt}`)
      .digest('hex');
  }

  async validateUser(username: string, password: string): Promise<Users> {
    var user;
    if (this.isEmailValid(username)) {
      user = await this.userRepository.findOne({ where: { email: username } });
    } else {
      user = await this.userRepository.findOne({ username: username });
    }
    if (user && (await this.hashPassword(password)) === user.password) {
      return user;
    }
    return null;
  }

  isEmailValid(value): boolean {
    const EMAIL_REGEXP =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return EMAIL_REGEXP.test(value);
  }

  async register(data: UserRegisterDto): Promise<Users> {
    let user = await this.userRepository.findOne({ username: data.username });
    if (user) {
      throw new InternalServerErrorException(
        1,
        'User with this login already exists',
      );
    }
    if (data.email) {
      let user = await this.userRepository.findOne({ email: data.email });
      if (user) {
        throw new InternalServerErrorException(
          1,
          'User with this email already exists',
        );
      }
    }

    const hashedPassword = await this.hashPassword(data.password);
    return this.userRepository.save({
      username: data.username,
      email: data.email,
      password: hashedPassword,
    });
  }
}
