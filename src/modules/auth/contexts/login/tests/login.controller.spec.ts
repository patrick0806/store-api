import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { LoginController } from '../login.controller';
import { LoginService } from '../login.service';
import { LoginRequestDTO } from '../dtos/request.dto';

describe('LoginController', () => {
    let controller: LoginController;
    let service: LoginService;

    const mockLoginResponse = {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LoginController],
            providers: [
                {
                    provide: LoginService,
                    useValue: {
                        execute: vi.fn().mockResolvedValue(mockLoginResponse),
                    },
                },
            ],
        }).compile();

        controller = module.get<LoginController>(LoginController);
        service = module.get<LoginService>(LoginService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('handle', () => {
        it('should return login response with tokens', async () => {
            const loginData: LoginRequestDTO = {
                email: 'test@example.com',
                password: 'password123',
            };

            const result = await controller.handle(loginData);

            expect(service.execute).toHaveBeenCalledWith(loginData);
            expect(result).toEqual(mockLoginResponse);
        });

        it('should pass through any errors from the service', async () => {
            const loginData: LoginRequestDTO = {
                email: 'test@example.com',
                password: 'password123',
            };

            const error = new Error('Authentication failed');
            vi.spyOn(service, 'execute').mockRejectedValue(error);

            await expect(controller.handle(loginData)).rejects.toThrow(error);
        });
    });
}); 