import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ListOrdersService } from '../listOrders.service';
import { OrderRepository } from '@shared/repositories/order.repository';
import { ListOrdersQueryParamsDTO } from '../dtos/query.dto';
import { PageResponse } from '@shared/dtos/pageResponse.dto';
import { OrderDTO } from '@shared/dtos/order/order.dto';
import { Order } from '@shared/entities/order/order.entity';

describe('ListOrdersService', () => {
    let service: ListOrdersService;
    let orderRepository: OrderRepository;

    const mockOrder = {
        id: 1,
        code: '123456',
        status: 'COMPLETED',
        totalAmount: 150.75,
        customerId: 1,
        items: [],
        customer: null,
        paymentDetails: null,
        shipmentDetails: null,
        approvalDate: null,
        cancellationDate: null,
        version: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    } as Order;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ListOrdersService,
                {
                    provide: OrderRepository,
                    useValue: {
                        listCustomerOrders: vi.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<ListOrdersService>(ListOrdersService);
        orderRepository = module.get<OrderRepository>(OrderRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return a PageResponse of orders', async () => {
        const customerId = 1;
        const query: ListOrdersQueryParamsDTO = { page: 0, size: 10 };
        const mockOrders = [mockOrder];
        vi.spyOn(orderRepository, 'listCustomerOrders').mockResolvedValue([mockOrders, mockOrders.length]);

        const result = await service.execute(customerId, query);

        expect(orderRepository.listCustomerOrders).toHaveBeenCalledWith({ ...query, customerId });
        expect(result).toEqual({
            page: query.page,
            size: query.size,
            totalElements: mockOrders.length,
            totalPages: 1,
            content: expect.arrayContaining([expect.objectContaining({ id: mockOrder.id })]),
        });
    });

    it('should return an empty PageResponse when no orders are found', async () => {
        const customerId = 1;
        const query: ListOrdersQueryParamsDTO = { page: 0, size: 10 };
        vi.spyOn(orderRepository, 'listCustomerOrders').mockResolvedValue([[], 0]);

        const result = await service.execute(customerId, query);

        expect(orderRepository.listCustomerOrders).toHaveBeenCalledWith({ ...query, customerId });
        expect(result).toEqual({
            page: query.page,
            size: query.size,
            totalElements: 0,
            totalPages: 0,
            content: [],
        });
    });
});