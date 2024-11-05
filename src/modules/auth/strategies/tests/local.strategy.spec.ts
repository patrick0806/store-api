import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { LocalStrategy } from '../local.strategy';
import { CustomerRepository } from '@shared/repositories/customer.repository';
import { UserRepository } from '@shared/repositories/user.repository';
import { User } from '@shared/entities/user.entity';
import { Customer } from '@shared/entities/customer.entity';
import * as hashUtil from '@shared/utils/hash.util';

vi.mock('@shared/utils/hash.util');

describe('LocalStrategy', () => {
    let strategy: LocalStrategy;
    let customerRepository: CustomerRepository;
    let userRepository: UserRepository;

    const mockUser: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedPassword',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1
    };

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
                LocalStrategy,
                {
                    provide: CustomerRepository,
                    useValue: {
                        findByEmail: vi.fn(),
                    },
                },
                {
                    provide: UserRepository,
                    useValue: {
                        findByEmail: vi.fn(),
                    },
                },
            ],
        }).compile();

        strategy = module.get<LocalStrategy>(LocalStrategy);
        customerRepository = module.get<CustomerRepository>(CustomerRepository);
        userRepository = module.get<UserRepository>(UserRepository);
    });

    it('should be defined', () => {
        expect(strategy).toBeDefined();
    });

    describe('validate', () => {
        beforeEach(() => {
            vi.spyOn(hashUtil, 'compareHash').mockResolvedValue(true);
        });

        it('should validate customer credentials and return customer', async () => {
            vi.spyOn(customerRepository, 'findByEmail').mockResolvedValue(mockCustomer);
            vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

            const result = await strategy.validate('jane@example.com', 'password123');

            expect(result).toEqual(mockCustomer);
            expect(customerRepository.findByEmail).toHaveBeenCalledWith('jane@example.com');
            expect(hashUtil.compareHash).toHaveBeenCalledWith('password123', mockCustomer.password);
        });

        it('should validate user credentials and return user', async () => {
            vi.spyOn(customerRepository, 'findByEmail').mockResolvedValue(null);
            vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(mockUser);

            const result = await strategy.validate('john@example.com', 'password123');

            expect(result).toEqual(mockUser);
            expect(userRepository.findByEmail).toHaveBeenCalledWith('john@example.com');
            expect(hashUtil.compareHash).toHaveBeenCalledWith('password123', mockUser.password);
        });

        it('should throw UnauthorizedException when password is invalid', async () => {
            vi.spyOn(customerRepository, 'findByEmail').mockResolvedValue(mockCustomer);
            vi.spyOn(hashUtil, 'compareHash').mockResolvedValue(false);

            await expect(strategy.validate('jane@example.com', 'wrongpassword'))
                .rejects
                .toThrow(UnauthorizedException);
        });

        it('should throw NotFoundException when user not found', async () => {
            vi.spyOn(customerRepository, 'findByEmail').mockResolvedValue(null);
            vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

            await expect(strategy.validate('nonexistent@example.com', 'password123'))
                .rejects
                .toThrow(NotFoundException);
        });
    });
}); 