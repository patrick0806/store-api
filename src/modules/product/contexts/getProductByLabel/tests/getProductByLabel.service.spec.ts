import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GetProductByLabelService } from '../getProductByLabel.service';
import { ProductRepository } from '@shared/repositories/product.repository';
import { EntityNotFoundException } from '@shared/exceptions/entityNotFound.exception';

describe('GetProductByLabelService', () => {
    let service: GetProductByLabelService;
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
                GetProductByLabelService,
                {
                    provide: ProductRepository,
                    useValue: {
                        findByLabel: vi.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<GetProductByLabelService>(GetProductByLabelService);
        productRepository = module.get<ProductRepository>(ProductRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return a product when found', async () => {
        vi.spyOn(productRepository, 'findByLabel').mockResolvedValue(mockProduct);

        const label = 'gaming-laptop';
        const result = await service.execute(label);

        expect(productRepository.findByLabel).toHaveBeenCalledWith(label);
        expect(result).toEqual(expect.objectContaining({
            id: mockProduct.id,
            name: mockProduct.name,
            label: mockProduct.label,
        }));
    });

    it('should throw EntityNotFoundException when product is not found', async () => {
        vi.spyOn(productRepository, 'findByLabel').mockResolvedValue(null);

        const label = 'non-existent-label';

        await expect(service.execute(label)).rejects.toThrow(EntityNotFoundException);
        expect(productRepository.findByLabel).toHaveBeenCalledWith(label);
    });
});