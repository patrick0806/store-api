import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CreateCustomerController } from '../createCustomer.controller';
import { CreateCustomerService } from '../createCustomer.service';
import { CreateCustomerRequestDTO } from '../dtos/request.dto';
import { EntityInUseException } from '@shared/exceptions/EntityInUse.exception';

describe('CreateCustomerController', () => {
    /*
    let controller: CreateCustomerController;
    let service: CreateCustomerService;

    const mockCustomerResponse = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CreateCustomerController],
            providers: [
                {
                    provide: CreateCustomerService,
                    useValue: {
                        execute: vi.fn().mockResolvedValue(mockCustomerResponse)
                    }
                }
            ]
        }).compile();

        controller = module.get<CreateCustomerController>(CreateCustomerController);
        service = module.get<CreateCustomerService>(CreateCustomerService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('handle', () => {
        it('should create a new customer successfully', async () => {
            const createCustomerDto: CreateCustomerRequestDTO = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
                phoneNumber: '1234567890'
            };

            const result = await controller.handle(createCustomerDto);

            expect(service.execute).toHaveBeenCalledWith(createCustomerDto);
            expect(result).toEqual(mockCustomerResponse);
            expect(result).not.toHaveProperty('password');
        });

        it('should handle EntityInUseException', async () => {
            const createCustomerDto: CreateCustomerRequestDTO = {
                name: 'John Doe',
                email: 'existing@example.com',
                password: 'password123',
                phoneNumber: '1234567890'
            };

            vi.spyOn(service, 'execute').mockRejectedValue(
                new EntityInUseException('Already exists a user create with this email in database')
            );

            await expect(controller.handle(createCustomerDto))
                .rejects
                .toThrow(EntityInUseException);
        });

        it('should pass through other errors', async () => {
            const createCustomerDto: CreateCustomerRequestDTO = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
                phoneNumber: '1234567890'
            };

            const error = new Error('Unexpected error');
            vi.spyOn(service, 'execute').mockRejectedValue(error);

            await expect(controller.handle(createCustomerDto))
                .rejects
                .toThrow(error);
        });
    });*/
}); 