import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ListOrdersController } from '../listOrders.controller';
import { ListOrdersService } from '../listOrders.service';
import { ListOrdersQueryParamsDTO } from '../dtos/query.dto';
import { PageResponse } from '@shared/dtos/pageResponse.dto';
import { OrderDTO } from '@shared/dtos/order/order.dto';
import { CustomerDTO } from '@shared/dtos/customer.dto';

describe('ListOrdersController', () => {
    let controller: ListOrdersController;
    let service: ListOrdersService;

    const mockOrder: OrderDTO = {
        id: 1,
        code: '123456',
        status: 'COMPLETED',
        total: 150.75,
        customer: { id: 1 } as CustomerDTO,
        items: [],
        payment: null,
        shipment: null,
        version: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const mockPageResponse: PageResponse<OrderDTO> = {
        page: 0,
        size: 10,
        totalElements: 1,
        totalPages: 1,
        content: [mockOrder],
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ListOrdersController],
            providers: [
                {
                    provide: ListOrdersService,
                    useValue: {
                        execute: vi.fn().mockResolvedValue(mockPageResponse),
                    },
                },
            ],
        }).compile();

        controller = module.get<ListOrdersController>(ListOrdersController);
        service = module.get<ListOrdersService>(ListOrdersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return a list of orders successfully', async () => {
        const customerId = 1;
        const query: ListOrdersQueryParamsDTO = { page: 0, size: 10 };

        const result = await controller.handler(customerId, query);

        expect(service.execute).toHaveBeenCalledWith(customerId, query);
        expect(result).toEqual(mockPageResponse);
    });

    it('should handle service exceptions', async () => {
        const customerId = 1;
        const query: ListOrdersQueryParamsDTO = { page: 0, size: 10 };
        vi.spyOn(service, 'execute').mockRejectedValue(new Error('Failed to fetch orders'));

        await expect(controller.handler(customerId, query)).rejects.toThrow('Failed to fetch orders');
    });
});