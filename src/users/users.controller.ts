import { Body, Controller, Post } from '@nestjs/common';
import { UserRegisterDto } from './dto/user_register.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() data: UserRegisterDto) {
    return await this.usersService.register(data);
  }
}
