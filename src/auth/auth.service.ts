import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(data) {
    if (!data.user) {
      return {
        access_token: null,
        error: data.error,
      };
    }
    const payload = { username: data.user.username, sub: data.user._id };
    return {
      access_token: this.jwtService.sign(payload),
      error: data.error,
    };
  }
}
