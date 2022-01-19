import {
  Controller,
  Request,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isMatch } from 'src/utils/encryption';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}
  @Post('/login')
  async login(@Request() req) {
    try {
      const userToLogin: LoginUserDto = req.body;
      const userFromDb = await this.authService.login(userToLogin.email);
      if (!userFromDb) {
        throw new UnauthorizedException(
          `User with email ${userToLogin.email} not found`,
        );
      } else {
        const comparePasswords = await isMatch(
          userToLogin.password,
          userFromDb.password,
        );
        if (!comparePasswords) {
          throw new UnauthorizedException(`Wrong password!`);
        }
        const { password, ...result } = JSON.parse(JSON.stringify(userFromDb));
        const payload = {
          email: userFromDb.email,
          _id: userFromDb._id,
        };
        return {
          access_token: this.jwtService.sign(payload),
          ...result,
        };
      }
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
