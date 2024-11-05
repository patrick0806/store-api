import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { RefreshTokenService } from '../refreshToken.service';
import { UserRepository } from '@shared/repositories/user.repository';
import { CustomerRepository } from '@shared/repositories/customer.repository';
import env from '@config/env';
import { User } from '@shared/entities/user.entity';
import { Customer } from '@shared/entities/customer.entity';

describe('RefreshTokenService', () => {
    let service: RefreshTokenService;
    let jwtService: JwtService;
    let userRepository: UserRepository;
    let customerRepository: CustomerRepository;

    const mockUser = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        isActive: true
    } as User;

    const mockCustomer = {
        id: 2,
        name: 'Jane Customer',
        email: 'jane@example.com',
        isActive: true
    } as Customer;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RefreshTokenService,
                {
                    provide: JwtService,
                    useValue: {
                        verify: vi.fn(),
                        sign: vi.fn()
                    }
                },
                {
                    provide: UserRepository,
                    useValue: {
                        findById: vi.fn()
                    }
                },
                {
                    provide: CustomerRepository,
                    useValue: {
                        findById: vi.fn()
                    }
                }
            ]
        }).compile();

        service = module.get<RefreshTokenService>(RefreshTokenService);
        jwtService = module.get<JwtService>(JwtService);
        userRepository = module.get<UserRepository>(UserRepository);
        customerRepository = module.get<CustomerRepository>(CustomerRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('execute', () => {
        it('should refresh tokens for admin user', async () => {
            const refreshToken = 'valid.refresh.token';
            const decodedToken = { id: 1, role: 'ADMIN' };
            const mockTokens = {
                accessToken: 'new.access.token',
                refreshToken: 'new.refresh.token'
            };

            vi.spyOn(jwtService, 'verify').mockReturnValue(decodedToken);
            vi.spyOn(userRepository, 'findById').mockResolvedValue(mockUser as any);
            vi.spyOn(customerRepository, 'findById').mockResolvedValue(null);
            vi.spyOn(jwtService, 'sign')
                .mockReturnValueOnce(mockTokens.accessToken)
                .mockReturnValueOnce(mockTokens.refreshToken);

            const result = await service.execute(refreshToken);

            expect(jwtService.verify).toHaveBeenCalledWith(refreshToken, {
                secret: env().application.jwt.refreshSecret
            });

            expect(userRepository.findById).toHaveBeenCalledWith(decodedToken.id);
            expect(result).toEqual(mockTokens);
        });

        it('should refresh tokens for customer', async () => {
            const refreshToken = 'valid.refresh.token';
            const decodedToken = { id: 2 };
            const mockTokens = {
                accessToken: 'new.access.token',
                refreshToken: 'new.refresh.token'
            };

            vi.spyOn(jwtService, 'verify').mockReturnValue(decodedToken);
            vi.spyOn(userRepository, 'findById').mockResolvedValue(null);
            vi.spyOn(customerRepository, 'findById').mockResolvedValue(mockCustomer as any);
            vi.spyOn(jwtService, 'sign')
                .mockReturnValueOnce(mockTokens.accessToken)
                .mockReturnValueOnce(mockTokens.refreshToken);

            const result = await service.execute(refreshToken);

            expect(jwtService.verify).toHaveBeenCalledWith(refreshToken, {
                secret: env().application.jwt.refreshSecret
            });

            expect(customerRepository.findById).toHaveBeenCalledWith(decodedToken.id);
            expect(result).toEqual(mockTokens);
        });

        it('should throw UnauthorizedException when refresh token is invalid', async () => {
            const refreshToken = 'invalid.token';

            vi.spyOn(jwtService, 'verify').mockImplementation(() => {
                throw new Error('Invalid token');
            });

            await expect(service.execute(refreshToken))
                .rejects
                .toThrow(Error);
        });

        it('should throw UnauthorizedException when user not found', async () => {
            const refreshToken = 'valid.refresh.token';
            const decodedToken = { id: 9 };

            vi.spyOn(jwtService, 'verify').mockResolvedValue(decodedToken);
            vi.spyOn(userRepository, 'findById').mockResolvedValue(null);
            vi.spyOn(customerRepository, 'findById').mockResolvedValue(null);

            await expect(service.execute(refreshToken))
                .rejects
                .toThrow(UnauthorizedException);
        });
    });
}); 