import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    //    const user = await this.usersService.findById(request.user.id);

    const apiPrefix = process.env.API_PREFIX;
    let uri;
    if (!apiPrefix) {
      uri = request.method + ` ` + request.route.path.split('?')[0];
    } else {
      const urn = request.route.path
        .replace(new RegExp(`^/?${apiPrefix}`), '')
        .split('?')[0];
      uri = request.method + ` ` + urn;
    }

    return true;
  }
}
