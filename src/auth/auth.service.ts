import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(username, password): Promise<boolean> {
    const user = await this.userService.findOne(username);
    if (user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return false;
  }
}
