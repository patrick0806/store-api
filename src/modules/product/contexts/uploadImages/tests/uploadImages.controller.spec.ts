import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UploadImagesController } from '../uploadImages.controller';
import { UploadImagesService } from '../uploadImages.service';
import { File } from '@nest-lab/fastify-multer';

describe('UploadImagesController', () => {
    let controller: UploadImagesController;
    let service: UploadImagesService;

    const mockFile: File = {
        originalname: 'test-image.jpg',
        // outras propriedades...
    } as File;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UploadImagesController],
            providers: [
                {
                    provide: UploadImagesService,
                    useValue: {
                        execute: vi.fn().mockResolvedValue({
                            successUploads: [{ fileName: 'test-image.jpg', url: 'http://example.com/test-image.jpg', success: true }],
                            failedUploads: [],
                        }),
                    },
                },
            ],
        }).compile();

        controller = module.get<UploadImagesController>(UploadImagesController);
        service = module.get<UploadImagesService>(UploadImagesService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should upload images successfully', async () => {
        const result = await controller.handler(1, [mockFile]);

        expect(service.execute).toHaveBeenCalledWith(1, [mockFile]);
        expect(result.successUploads.length).toBe(1);
        expect(result.failedUploads.length).toBe(0);
    });

    it('should handle exceptions thrown by the service', async () => {
        vi.spyOn(service, 'execute').mockRejectedValue(new Error('Unexpected error'));

        await expect(controller.handler(1, [mockFile]))
            .rejects
            .toThrow('Unexpected error');
    });
});