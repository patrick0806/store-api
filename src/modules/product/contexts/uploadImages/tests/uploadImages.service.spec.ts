import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { File } from '@nest-lab/fastify-multer';
import { UploadImagesService } from '../uploadImages.service';
import { ProductRepository } from '@shared/repositories/product.repository';
import { ProductImageRepository } from '@shared/repositories/productImage.repository';
import { EntityNotFoundException } from '@shared/exceptions/entityNotFound.exception';
import { ImageProvider } from '@shared/interfaces/imageProvider.interface';
import { Product } from '@shared/entities/product/product.entity';
import { ProductImage } from '@shared/entities/product/productImage.entity';

describe('UploadImagesService', () => {
    let service: UploadImagesService;
    let productRepository: ProductRepository;
    let productImageRepository: ProductImageRepository;
    let imageProvider: ImageProvider;

    const mockProduct = {
        id: 1,
        name: 'Gaming Laptop',
        // outras propriedades...
    } as Product;

    const mockImage: File = {
        originalname: 'test-image.jpg',
        // outras propriedades do File, como buffer, mimetype, etc.
    } as File;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UploadImagesService,
                {
                    provide: ProductRepository,
                    useValue: {
                        findById: vi.fn(),
                    },
                },
                {
                    provide: ProductImageRepository,
                    useValue: {
                        findLastOrder: vi.fn(),
                        createMultiple: vi.fn(),
                    },
                },
                {
                    provide: 'ImageProvider',
                    useValue: {
                        uploadImage: vi.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<UploadImagesService>(UploadImagesService);
        productRepository = module.get<ProductRepository>(ProductRepository);
        productImageRepository = module.get<ProductImageRepository>(ProductImageRepository);
        imageProvider = module.get<ImageProvider>('ImageProvider');
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should throw EntityNotFoundException if product does not exist', async () => {
        vi.spyOn(productRepository, 'findById').mockResolvedValue(null);

        await expect(service.execute(1, [mockImage]))
            .rejects
            .toThrow(EntityNotFoundException);

        expect(productRepository.findById).toHaveBeenCalledWith(1);
    });

    it('should upload images successfully', async () => {
        vi.spyOn(productRepository, 'findById').mockResolvedValue(mockProduct);
        vi.spyOn(productImageRepository, 'findLastOrder').mockResolvedValue({ order: 0 } as ProductImage);
        vi.spyOn(imageProvider, 'uploadImage').mockResolvedValue('http://example.com/test-image.jpg');
        vi.spyOn(productImageRepository, 'createMultiple').mockResolvedValue(null);

        const result = await service.execute(1, [mockImage]);

        expect(productRepository.findById).toHaveBeenCalledWith(1);
        expect(imageProvider.uploadImage).toHaveBeenCalledWith(mockImage);
        expect(productImageRepository.createMultiple).toHaveBeenCalled();
        expect(result.successUploads.length).toBe(1);
        expect(result.failedUploads.length).toBe(0);
    });

    it('should handle failed image uploads', async () => {
        vi.spyOn(productRepository, 'findById').mockResolvedValue(mockProduct);
        vi.spyOn(productImageRepository, 'findLastOrder').mockResolvedValue({ order: 0 } as ProductImage);
        vi.spyOn(imageProvider, 'uploadImage').mockRejectedValue(new Error('Upload failed'));

        const result = await service.execute(1, [mockImage]);

        expect(productRepository.findById).toHaveBeenCalledWith(1);
        expect(imageProvider.uploadImage).toHaveBeenCalledWith(mockImage);
        expect(result.successUploads.length).toBe(0);
        expect(result.failedUploads.length).toBe(1);
    });
});