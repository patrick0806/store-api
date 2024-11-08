import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ListProductsController } from '../listProducts.controller';
import { ListProductService } from '../listProducts.service';
import { ListProductsQueryParamsDTO } from '../dtos/query.dto';
import { PageResponse } from '@shared/dtos/pageResponse.dto';
import { ProductDTO } from '@shared/dtos/product/product.dto';
import { ProductCategoryDTO } from '@shared/dtos/product/productCategory.dto';

describe('ListProductsController', () => {
    let controller: ListProductsController;
    let service: ListProductService;

    const mockProduct: ProductDTO = {
        id: 1,
        name: 'Gaming Laptop',
        description: 'High-end gaming laptop',
        price: 1999.99,
        stock: 10,
        sku: 'LAP-123',
        label: 'gaming-laptop',
        discount: 0,
        height: 2.5,
        width: 35.8,
        length: 24.2,
        weight: 2.3,
        category: { id: 1, name: 'Electronics' } as ProductCategoryDTO,
        images: [],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1,
    };

    const mockPageResponse: PageResponse<ProductDTO> = {
        page: 0,
        size: 10,
        totalElements: 1,
        totalPages: 1,
        content: [mockProduct],
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ListProductsController],
            providers: [
                {
                    provide: ListProductService,
                    useValue: {
                        execute: vi.fn().mockResolvedValue(mockPageResponse),
                    },
                },
            ],
        }).compile();

        controller = module.get<ListProductsController>(ListProductsController);
        service = module.get<ListProductService>(ListProductService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return a list of products successfully', async () => {
        const query: ListProductsQueryParamsDTO = { page: 0, size: 10, name: 'Gaming Laptop', categoryId: 1 };

        const result = await controller.handler(query);

        expect(service.execute).toHaveBeenCalledWith(query);
        expect(result).toEqual(mockPageResponse);
    });

    it('should handle service exceptions', async () => {
        const query: ListProductsQueryParamsDTO = { page: 0, size: 10, name: 'Invalid', categoryId: 99 };
        vi.spyOn(service, 'execute').mockRejectedValue(new Error('Failed to fetch products'));

        await expect(controller.handler(query)).rejects.toThrow('Failed to fetch products');
    });
});