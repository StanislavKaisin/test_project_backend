import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { isMatch } from 'src/utils/encryption';
import { LoginUserDto } from './dto/login-user.dto';

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
    // const payload = { email: user.email, password: user.password };
    // console.log(`user`, user);
    // try {
    const userFromDb = await this.usersService.findOne(email);
    return userFromDb;
    // if (!userFromDb) {
    //   return new Error(`User with email ${user.email} not found`);
    // }
    // const comparePasswords = await isMatch(user.password, userFromDb.password);
    // console.log(`userFromDb`, userFromDb);
    // if (userFromDb && comparePasswords) {
    //   const { password, ...result } = JSON.parse(JSON.stringify(userFromDb));
    //   return {
    //     access_token: this.jwtService.sign(payload),
    //     userData: result,
    //   };
    // } else {
    //   // throw
    // }
    // return new UnauthorizedException();
    // } catch (error) {
    //   throw new UnauthorizedException(error);
    // }
  }
}
