import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from 'src/Config/config';

const secretKey = config.SECRET;
// console.log(`config`, config);
// console.log(`secretKey`, secretKey);

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiation: false,
      secretOrKey: secretKey,
    });
  }
}
