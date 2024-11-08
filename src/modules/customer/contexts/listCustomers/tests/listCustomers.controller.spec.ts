import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ListCustomersController } from '../listCustomers.controller';
import { ListCustomersService } from '../listCustomers.service';

describe('ListCustomersController', () => {
    let controller: ListCustomersController;
    let service: ListCustomersService;

    const mockPaginatedResponse = {
        content: [
            {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                phoneNumber: '1234567890',
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                version: 1
            }
        ],
        page: 1,
        size: 10,
        totalElements: 1,
        totalPages: 1
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ListCustomersController],
            providers: [
                {
                    provide: ListCustomersService,
                    useValue: {
                        execute: vi.fn().mockResolvedValue(mockPaginatedResponse)
                    }
                }
            ]
        }).compile();

        controller = module.get<ListCustomersController>(ListCustomersController);
        service = module.get<ListCustomersService>(ListCustomersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('handle', () => {
        it('should return paginated customers', async () => {
            const query = {
                page: 1,
                size: 10,
                sort: 'ASC' as const,
                orderBy: 'name'
            };

            const result = await controller.handle(query);

            expect(service.execute).toHaveBeenCalledWith(query);
            expect(result).toEqual(mockPaginatedResponse);
            expect(result.content[0]).not.toHaveProperty('password');
        });

        it('should handle empty query parameters', async () => {
            const result = await controller.handle({});

            expect(service.execute).toHaveBeenCalledWith({});
            expect(result).toEqual(mockPaginatedResponse);
        });
    });
}); 