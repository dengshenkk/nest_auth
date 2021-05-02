import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username, password): Promise<boolean> {
    const user = await this.userService.findOne(username);
    if (user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return false;
  }

  async login(user: any) {
    console.log('AuthService login: ', user);
    const payload = { username: user.username, id: user.id };
    console.log('payload: ', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
