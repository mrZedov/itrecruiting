import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users/entity/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async create(data: any): Promise<Users> {
    return this.userRepository.save(data);
  }

  async findOne(condition: any): Promise<Users> {
    return this.userRepository.findOne(condition);
  }
}
