import {
  Controller,
  Request,
  Post,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/schemas/user.schema';
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
      // console.log(`userToLogin`, userToLogin);
      const userFromDb = await this.authService.login(userToLogin.email);
      // console.log(`userFromDb`, userFromDb);
      if (!userFromDb) {
        throw new UnauthorizedException(
          `User with email ${userToLogin.email} not found`,
        );
      } else {
        const comparePasswords = await isMatch(
          userToLogin.password,
          (userFromDb as UserDocument).password,
        );
        if (!comparePasswords) {
          throw new UnauthorizedException(`Wrong password!`);
        }
        if (userFromDb && comparePasswords) {
          const { password, ...result } = JSON.parse(
            JSON.stringify(userFromDb),
          );
          const payload = {
            email: userToLogin.email,
            password: userToLogin.password,
          };
          return {
            access_token: this.jwtService.sign(payload),
            ...result,
          };
        }
      }
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
