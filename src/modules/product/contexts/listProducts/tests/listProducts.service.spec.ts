import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ListProductService } from '../listProducts.service';
import { ProductRepository } from '@shared/repositories/product.repository';
import { ListProductsQueryParamsDTO } from '../dtos/query.dto';

describe('ListProductService', () => {
    let service: ListProductService;
    let productRepository: ProductRepository;

    const mockProduct = {
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
        category: { id: 1, name: 'Electronics' },
        images: [],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1,
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ListProductService,
                {
                    provide: ProductRepository,
                    useValue: {
                        listProducts: vi.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<ListProductService>(ListProductService);
        productRepository = module.get<ProductRepository>(ProductRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return a PageResponse of products', async () => {
        const query: ListProductsQueryParamsDTO = { page: 0, size: 10, name: 'Gaming Laptop', categoryId: 1 };
        const mockProducts = [mockProduct];
        vi.spyOn(productRepository, 'listProducts').mockResolvedValue([mockProducts, mockProducts.length]);

        const result = await service.execute(query);

        expect(productRepository.listProducts).toHaveBeenCalledWith(query);
        expect(result).toEqual({
            page: query.page,
            size: query.size,
            totalElements: mockProducts.length,
            totalPages: 1,
            content: expect.arrayContaining([expect.objectContaining({ id: mockProduct.id })]),
        });
    });

    it('should return an empty PageResponse when no products are found', async () => {
        const query: ListProductsQueryParamsDTO = { page: 0, size: 10, name: 'Invalid', categoryId: 99 };
        vi.spyOn(productRepository, 'listProducts').mockResolvedValue([[], 0]);

        const result = await service.execute(query);

        expect(productRepository.listProducts).toHaveBeenCalledWith(query);
        expect(result).toEqual({
            page: query.page,
            size: query.size,
            totalElements: 0,
            totalPages: 0,
            content: [],
        });
    });
});