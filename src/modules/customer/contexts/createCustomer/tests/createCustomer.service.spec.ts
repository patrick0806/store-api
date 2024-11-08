import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CreateCustomerService } from '../createCustomer.service';
import { CustomerRepository } from '@shared/repositories/customer.repository';
import { EntityInUseException } from '@shared/exceptions/EntityInUse.exception';
import * as hashUtil from '@shared/utils/hash.util';

describe('CreateCustomerService', () => {
    /*
    let service: CreateCustomerService;
    let customerRepository: CustomerRepository;

    const mockCustomer = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedPassword123',
        phoneNumber: '1234567890',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateCustomerService,
                {
                    provide: CustomerRepository,
                    useValue: {
                        findByEmail: vi.fn(),
                        create: vi.fn()
                    }
                }
            ]
        }).compile();

        service = module.get<CreateCustomerService>(CreateCustomerService);
        customerRepository = module.get<CustomerRepository>(CustomerRepository);

        vi.spyOn(hashUtil, 'generateHash').mockReturnValue('hashedPassword123');
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('execute', () => {
        it('should create a new customer successfully', async () => {
            const createCustomerDto = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
                phoneNumber: '1234567890'
            };

            vi.spyOn(customerRepository, 'findByEmail').mockResolvedValue(null);
            vi.spyOn(customerRepository, 'create').mockResolvedValue(mockCustomer);

            const result = await service.execute(createCustomerDto);

            expect(customerRepository.findByEmail).toHaveBeenCalledWith(createCustomerDto.email);
            expect(hashUtil.generateHash).toHaveBeenCalledWith(createCustomerDto.password);
            expect(customerRepository.create).toHaveBeenCalledWith({
                ...createCustomerDto,
                password: 'hashedPassword123'
            });

            expect(result).toEqual(expect.objectContaining({
                id: mockCustomer.id,
                name: mockCustomer.name,
                email: mockCustomer.email,
                phoneNumber: mockCustomer.phoneNumber,
                isActive: mockCustomer.isActive
            }));
            expect(result).not.toHaveProperty('password');
        });

        it('should throw EntityInUseException when email already exists', async () => {
            const createCustomerDto = {
                name: 'John Doe',
                email: 'existing@example.com',
                password: 'password123',
                phoneNumber: '1234567890'
            };

            vi.spyOn(customerRepository, 'findByEmail').mockResolvedValue(mockCustomer);

            await expect(service.execute(createCustomerDto))
                .rejects
                .toThrow(EntityInUseException);

            expect(customerRepository.findByEmail).toHaveBeenCalledWith(createCustomerDto.email);
            expect(customerRepository.create).not.toHaveBeenCalled();
        });

        it('should transform response to DTO and exclude password', async () => {
            const createCustomerDto = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
                phoneNumber: '1234567890'
            };

            vi.spyOn(customerRepository, 'findByEmail').mockResolvedValue(null);
            vi.spyOn(customerRepository, 'create').mockResolvedValue(mockCustomer);

            const result = await service.execute(createCustomerDto);

            expect(result).not.toHaveProperty('password');
            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('name');
            expect(result).toHaveProperty('email');
            expect(result).toHaveProperty('phoneNumber');
            expect(result).toHaveProperty('isActive');
        });
    });*/
}); 