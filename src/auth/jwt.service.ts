import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

  // This class will help authenticating Requests from the Client
  //.. 'jwt' is an identifier for the UseGuard decorator

  constructor(){

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY // JWT KEY must be a env variable
    })
  }

  async validate(payload){ return payload }

}
