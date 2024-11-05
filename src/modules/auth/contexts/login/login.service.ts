import { Injectable, UnauthorizedException } from '@nestjs/common';

import { LocalStrategy } from '@modules/auth/strategies/local.strategy';

import { LoginRequestDTO } from './dtos/request.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@shared/entities/user.entity';
import env from '@config/env';

@Injectable()
export class LoginService {
  constructor(private localStrategy: LocalStrategy, private jwtService: JwtService) { }
  async execute(loginData: LoginRequestDTO): Promise<any> {
    const user = await this.localStrategy.validate(loginData.email, loginData.password);
    if (!user.isActive) {
      throw new UnauthorizedException('Invalid user')
    }

    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user instanceof User ? 'ADMIN' : 'CUSTOMER',
        },
        {
          expiresIn: env().application.jwt.expiration,
          secret: env().application.jwt.secrect,
        },
      ),
      refreshToken: this.jwtService.sign(
        { id: user.id },
        {
          expiresIn: env().application.jwt.refreshExpiration,
          secret: env().application.jwt.refreshSecret,
        },
      ),
    };
  }
}
