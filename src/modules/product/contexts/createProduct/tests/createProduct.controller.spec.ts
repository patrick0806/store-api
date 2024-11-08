import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EntityInUseException } from '@shared/exceptions/entityInUse.exception';
import { CreateProductController } from '../createProduct.controller';
import { CreateProductService } from '../createProduct.service';

describe('CreateProductController', () => {
    let controller: CreateProductController;
    let service: CreateProductService;

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
            controllers: [CreateProductController],
            providers: [
                {
                    provide: CreateProductService,
                    useValue: {
                        execute: vi.fn().mockResolvedValue(mockProduct)
                    }
                }
            ]
        }).compile();

        controller = module.get<CreateProductController>(CreateProductController);
        service = module.get<CreateProductService>(CreateProductService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('handler', () => {
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
                images: ['http://example.com/image1.jpg'],
                height: 2.5,
                width: 35.8,
                length: 24.2,
                weight: 2.3
            };

            const result = await controller.handler(createProductDto);

            expect(service.execute).toHaveBeenCalledWith(createProductDto);
            expect(result).toEqual(mockProduct);
        });

        it('should handle EntityInUseException', async () => {
            const createProductDto = {
                name: 'Gaming Laptop',
                description: 'High-end gaming laptop',
                price: 1999.99,
                stock: 10,
                sku: 'EXISTING-SKU',
                label: 'gaming-laptop',
                discount: 0,
                category: { id: 1, name: 'Electronics' },
                images: ['http://example.com/image1.jpg']
            };

            vi.spyOn(service, 'execute').mockRejectedValue(
                new EntityInUseException('Already exists a product with this sku')
            );

            await expect(controller.handler(createProductDto))
                .rejects
                .toThrow(EntityInUseException);
        });

        it('should pass through other errors', async () => {
            const createProductDto = {
                name: 'Gaming Laptop',
                description: 'High-end gaming laptop',
                price: 1999.99,
                stock: 10,
                sku: 'LAP-123',
                label: 'gaming-laptop',
                discount: 0,
                category: { id: 1, name: 'Electronics' },
                images: ['http://example.com/image1.jpg']
            };

            const error = new Error('Unexpected error');
            vi.spyOn(service, 'execute').mockRejectedValue(error);

            await expect(controller.handler(createProductDto))
                .rejects
                .toThrow(error);
        });
    });
}); 