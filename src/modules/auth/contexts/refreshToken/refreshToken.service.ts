import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import env from '@config/env';

import { UserRepository } from '@shared/repositories/user.repository';
import { CustomerRepository } from '@shared/repositories/customer.repository';
import { IAccessToken } from '@shared/interfaces/accessToken.interface';

import { RefreshTokenResponseDTO } from './dtos/response.dto';
import { User } from '@shared/entities/user.entity';
import { Customer } from '@shared/entities/customer.entity';

@Injectable()
export class RefreshTokenService {
    constructor(
        private userRepository: UserRepository,
        private customerRepository: CustomerRepository,
        private jwtService: JwtService,
    ) { }

    async execute(refreshToken: string): Promise<RefreshTokenResponseDTO> {
        const decodedToken = this.jwtService.verify<IAccessToken>(refreshToken, {
            secret: env().application.jwt.refreshSecret,
        });


        let user: Customer | User;

        if (decodedToken.role === 'ADMIN') {
            user = await this.userRepository.findById(decodedToken.id);
        } else {
            user = await this.customerRepository.findById(decodedToken.id);
        }

        if (!user || !user.isActive) {
            throw new UnauthorizedException('Token is invalid to be renewd')
        }

        const tokenPayload: IAccessToken = {
            id: user.id,
            role: decodedToken.role,
            name: user.name,
            email: user.email,
        };

        return {
            accessToken: this.jwtService.sign(tokenPayload, {
                expiresIn: env().application.jwt.expiration,
                secret: env().application.jwt.secrect,
            }),
            refreshToken: this.jwtService.sign(
                { id: tokenPayload.id, role: tokenPayload.role },
                {
                    expiresIn: env().application.jwt.refreshExpiration,
                    secret: env().application.jwt.refreshSecret,
                },
            ),
        };
    }
}