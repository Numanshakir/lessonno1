import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,

      secretOrKey: 'MySecretTest',
    });
  }
  validate(payload: { id: number }) {
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }
    return { id: payload.id };
  }
}
