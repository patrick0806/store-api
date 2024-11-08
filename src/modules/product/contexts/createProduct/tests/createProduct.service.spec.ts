import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CreateProductService } from '../createProduct.service';
import { ProductRepository } from '@shared/repositories/product.repository';
import { EntityInUseException } from '@shared/exceptions/EntityInUse.exception';
import { Product } from '@shared/entities/product/product.entity';

describe('CreateProductService', () => {
    let service: CreateProductService;
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
        category: {
            id: 1,
            name: 'Electronics'
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateProductService,
                {
                    provide: ProductRepository,
                    useValue: {
                        create: vi.fn(),
                        findBySku: vi.fn()
                    }
                }
            ]
        }).compile();

        service = module.get<CreateProductService>(CreateProductService);
        productRepository = module.get<ProductRepository>(ProductRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('execute', () => {
        it('should create a product successfully', async () => {
            const createProductDto = {
                name: 'Gaming Laptop',
                description: 'High-end gaming laptop',
                price: 1999.99,
                stock: 10,
                sku: 'LAP-123',
                label: 'gaming-laptop',
                discount: 0,
                category: { id: 1, name: 'Electronics' },
                height: 2.5,
                width: 35.8,
                length: 24.2,
                weight: 2.3
            };

            vi.spyOn(productRepository, 'findBySku').mockResolvedValue(null);
            vi.spyOn(productRepository, 'create').mockResolvedValue(mockProduct as Product);

            const result = await service.execute(createProductDto);

            expect(productRepository.findBySku).toHaveBeenCalledWith(createProductDto.sku);
            expect(productRepository.create).toHaveBeenCalledWith(createProductDto);
            expect(result).toEqual(expect.objectContaining({
                id: expect.any(Number),
                name: createProductDto.name,
                sku: createProductDto.sku,
                price: createProductDto.price
            }));
        });

        it('should throw EntityInUseException when SKU already exists', async () => {
            const createProductDto = {
                name: 'Gaming Laptop',
                description: 'High-end gaming laptop',
                price: 1999.99,
                stock: 10,
                sku: 'EXISTING-SKU',
                label: 'gaming-laptop',
                discount: 0,
                category: { id: 1, name: 'Electronics' },
            };

            vi.spyOn(productRepository, 'findBySku').mockResolvedValue(mockProduct as Product);

            await expect(service.execute(createProductDto))
                .rejects
                .toThrow(EntityInUseException);

            expect(productRepository.findBySku).toHaveBeenCalledWith(createProductDto.sku);
            expect(productRepository.create).not.toHaveBeenCalled();
        });

        it('should transform response to DTO', async () => {
            const createProductDto = {
                name: 'Gaming Laptop',
                description: 'High-end gaming laptop',
                price: 1999.99,
                stock: 10,
                sku: 'LAP-123',
                label: 'gaming-laptop',
                discount: 0,
                category: { id: 1, name: 'Electronics' }
            };

            vi.spyOn(productRepository, 'findBySku').mockResolvedValue(null);
            vi.spyOn(productRepository, 'create').mockResolvedValue(mockProduct as Product);

            const result = await service.execute(createProductDto);

            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('name');
            expect(result).toHaveProperty('sku');
            expect(result).toHaveProperty('price');
            expect(result).toHaveProperty('category');
        });
    });
}); 