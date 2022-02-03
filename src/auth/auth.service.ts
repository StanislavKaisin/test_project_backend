import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { isMatch } from 'src/utils/encryption';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findOne(email);
      const comparePasswords = await isMatch(user.password, pass);
      if (user && comparePasswords) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async login(email: string) {
    const userFromDb = await this.usersService.findOne(email);
    return userFromDb;
  }
}
