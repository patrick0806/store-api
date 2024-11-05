import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { RefreshTokenController } from '../refreshToken.controller';
import { RefreshTokenService } from '../refreshToken.service';
import { RefreshTokenRequestDTO } from '../dtos/request.dto';

describe('RefreshTokenController', () => {
    let controller: RefreshTokenController;
    let service: RefreshTokenService;

    const mockTokens = {
        accessToken: 'new.access.token',
        refreshToken: 'new.refresh.token'
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RefreshTokenController],
            providers: [
                {
                    provide: RefreshTokenService,
                    useValue: {
                        execute: vi.fn().mockResolvedValue(mockTokens)
                    }
                }
            ]
        }).compile();

        controller = module.get<RefreshTokenController>(RefreshTokenController);
        service = module.get<RefreshTokenService>(RefreshTokenService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('handle', () => {
        it('should return new tokens', async () => {
            const refreshTokenDto: RefreshTokenRequestDTO = {
                refreshToken: 'valid.refresh.token'
            };

            const result = await controller.handle(refreshTokenDto);

            expect(service.execute).toHaveBeenCalledWith(refreshTokenDto.refreshToken);
            expect(result).toEqual(mockTokens);
        });

        it('should pass through service errors', async () => {
            const refreshTokenDto: RefreshTokenRequestDTO = {
                refreshToken: 'invalid.token'
            };

            const error = new Error('Invalid token');
            vi.spyOn(service, 'execute').mockRejectedValue(error);

            await expect(controller.handle(refreshTokenDto))
                .rejects
                .toThrow(error);
        });
    });
}); 