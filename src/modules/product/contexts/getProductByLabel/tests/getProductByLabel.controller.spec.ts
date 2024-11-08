import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GetProductByLabelController } from '../getProductByLabel.controller';
import { GetProductByLabelService } from '../getProductByLabel.service';
import { ProductDTO } from '@shared/dtos/product/product.dto';
import { ProductCategoryDTO } from '@shared/dtos/product/productCategory.dto';

describe('GetProductByLabelController', () => {
    let controller: GetProductByLabelController;
    let service: GetProductByLabelService;

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

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GetProductByLabelController],
            providers: [
                {
                    provide: GetProductByLabelService,
                    useValue: {
                        execute: vi.fn().mockResolvedValue(mockProduct),
                    },
                },
            ],
        }).compile();

        controller = module.get<GetProductByLabelController>(GetProductByLabelController);
        service = module.get<GetProductByLabelService>(GetProductByLabelService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return a product successfully', async () => {
        const label = 'gaming-laptop';
        const result = await controller.handler(label);

        expect(service.execute).toHaveBeenCalledWith(label);
        expect(result).toEqual(mockProduct);
    });

    it('should handle service exceptions', async () => {
        const label = 'non-existent-label';
        vi.spyOn(service, 'execute').mockRejectedValue(new Error('Product not found'));

        await expect(controller.handler(label)).rejects.toThrow('Product not found');
    });
});