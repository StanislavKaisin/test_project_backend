import { Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { config } from 'src/Config/config';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

const secretKey = config.SECRET;

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: secretKey,
      signOptions: {
        expiresIn: '3600s',
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
