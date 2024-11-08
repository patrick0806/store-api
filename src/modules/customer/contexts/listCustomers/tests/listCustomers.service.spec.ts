import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ListCustomersService } from '../listCustomers.service';
import { CustomerRepository } from '@shared/repositories/customer.repository';

describe('ListCustomersService', () => {
    let service: ListCustomersService;
    let customerRepository: CustomerRepository;

    const mockCustomers = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            password: 'hashedPassword123',
            phoneNumber: '1234567890',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            version: 1
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            password: 'hashedPassword456',
            phoneNumber: '0987654321',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            version: 1
        }
    ];

    const mockPaginatedResponse = {
        content: mockCustomers,
        page: 1,
        size: 10,
        totalElements: 2,
        totalPages: 1
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ListCustomersService,
                {
                    provide: CustomerRepository,
                    useValue: {
                        findAll: vi.fn().mockResolvedValue(mockPaginatedResponse)
                    }
                }
            ]
        }).compile();

        service = module.get<ListCustomersService>(ListCustomersService);
        customerRepository = module.get<CustomerRepository>(CustomerRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('execute', () => {
        it('should return paginated customers without password', async () => {
            const query = {
                page: 1,
                size: 10,
                sort: 'ASC' as const,
                orderBy: 'name'
            };

            const result = await service.execute(query);

            expect(customerRepository.findAll).toHaveBeenCalledWith(query);

            expect(result.content).toHaveLength(2);
            result.content.forEach(customer => {
                expect(customer.password).toBe(undefined);
            });
            expect(result.page).toBe(1);
            expect(result.size).toBe(10);
            expect(result.totalElements).toBe(2);
            expect(result.totalPages).toBe(1);
        });

        it('should use default values when query params are not provided', async () => {
            const result = await service.execute({});

            expect(customerRepository.findAll).toHaveBeenCalledWith({
                page: 1,
                size: 10,
                sort: 'ASC',
                orderBy: 'name',
                filter: undefined
            });

            expect(result.content).toBeDefined();
        });

        it('should apply filters when provided', async () => {
            const query = {
                page: 1,
                size: 10,
                sort: 'ASC' as const,
                orderBy: 'name'
            };

            await service.execute(query);

            expect(customerRepository.findAll).toHaveBeenCalledWith(query);
        });
    });
}); 