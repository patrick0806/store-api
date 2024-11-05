import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { LoginService } from '../login.service';
import { LocalStrategy } from '@modules/auth/strategies/local.strategy';
import { User } from '@shared/entities/user.entity';
import { Customer } from '@shared/entities/customer.entity';
import env from '@config/env';

describe('LoginService', () => {
    let service: LoginService;
    let localStrategy: LocalStrategy;
    let jwtService: JwtService;

    //use like that for constructor for instanceof validation
    const mockUser: User = new User();
    mockUser.id = 1;
    mockUser.name = 'John Doe';
    mockUser.email = 'john@example.com';
    mockUser.password = 'hashedPassword';
    mockUser.isActive = true;
    mockUser.createdAt = new Date();
    mockUser.updatedAt = new Date();
    mockUser.version = 1;


    const mockCustomer: Customer = {
        id: 1,
        name: 'Jane Customer',
        email: 'jane@example.com',
        password: 'hashedPassword',
        phoneNumber: '1234567890',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LoginService,
                {
                    provide: LocalStrategy,
                    useValue: {
                        validate: vi.fn(),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: vi.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<LoginService>(LoginService);
        localStrategy = module.get<LocalStrategy>(LocalStrategy);
        jwtService = module.get<JwtService>(JwtService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('execute', () => {
        it('should return tokens for admin user login', async () => {
            const loginData = { email: 'john@example.com', password: 'password123' };
            const mockTokens = {
                accessToken: 'mock-access-token',
                refreshToken: 'mock-refresh-token',
            };

            vi.spyOn(localStrategy, 'validate').mockResolvedValue(mockUser);
            vi.spyOn(jwtService, 'sign')
                .mockReturnValueOnce(mockTokens.accessToken)
                .mockReturnValueOnce(mockTokens.refreshToken);

            const result = await service.execute(loginData);

            expect(localStrategy.validate).toHaveBeenCalledWith(loginData.email, loginData.password);
            expect(jwtService.sign).toHaveBeenCalledTimes(2);
            expect(result).toEqual(mockTokens);
            // First call - access token
            expect(jwtService.sign).toHaveBeenNthCalledWith(1,
                {
                    id: mockUser.id,
                    name: mockUser.name,
                    email: mockUser.email,
                    role: 'ADMIN',
                },
                {
                    expiresIn: env().application.jwt.expiration,
                    secret: env().application.jwt.secrect,
                }
            );

            // Second call - refresh token
            expect(jwtService.sign).toHaveBeenNthCalledWith(2,
                { id: mockUser.id },
                {
                    expiresIn: env().application.jwt.refreshExpiration,
                    secret: env().application.jwt.refreshSecret,
                }
            );
        });

        it('should return tokens for customer login', async () => {
            const loginData = { email: 'jane@example.com', password: 'password123' };
            const mockTokens = {
                accessToken: 'mock-access-token',
                refreshToken: 'mock-refresh-token',
            };

            vi.spyOn(localStrategy, 'validate').mockResolvedValue(mockCustomer);
            vi.spyOn(jwtService, 'sign')
                .mockReturnValueOnce(mockTokens.accessToken)
                .mockReturnValueOnce(mockTokens.refreshToken);

            const result = await service.execute(loginData);

            expect(localStrategy.validate).toHaveBeenCalledWith(loginData.email, loginData.password);
            expect(jwtService.sign).toHaveBeenCalledTimes(2);
            expect(result).toEqual(mockTokens);
            expect(jwtService.sign).toHaveBeenCalledWith(
                {
                    id: mockCustomer.id,
                    name: mockCustomer.name,
                    email: mockCustomer.email,
                    role: 'CUSTOMER',
                },
                {
                    expiresIn: env().application.jwt.expiration,
                    secret: env().application.jwt.secrect,
                },
            );
        });
    });
}); 