import { File } from "@nest-lab/fastify-multer";
import { Inject, Injectable } from "@nestjs/common";
import { Product } from "@shared/entities/product/product.entity";
import { ProductImage } from "@shared/entities/product/productImage.entity";
import { EntityNotFoundException } from "@shared/exceptions/entityNotFound.exception";
import { ImageProvider } from "@shared/interfaces/imageProvider.interface";
import { ProductRepository } from "@shared/repositories/product.repository";
import { ProductImageRepository } from "@shared/repositories/productImage.repository";

@Injectable()
export class UploadImagesService {
    constructor(
        private productRepository: ProductRepository,
        private productImageRepository: ProductImageRepository,
        @Inject('ImageProvider')
        private imageProvider: ImageProvider,
    ) { }

    async execute(productId: number, images: File[]): Promise<any> {
        const product = await this.productRepository.findById(productId);
        if (!product) {
            throw new EntityNotFoundException('Cannot upload images because the product with this ID does not exist');
        }

        let uploads: Promise<{ fileName: string, url: string, success: boolean }>[] = [];


        uploads = images.map(async (image) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const url = await this.imageProvider.uploadImage(image);
                    resolve({ fileName: image.originalname, url, success: true });
                } catch (error) {
                    reject({ fileName: image.originalname, url: null, success: false });
                }
            });
        });


        const results = await Promise.allSettled(uploads);
        const lastProductImage = await this.productImageRepository.findLastOrder();

        const successUploads = results.filter((result) => result.status === 'fulfilled').map(result => result.value);
        const failedUploads = results.filter((result) => result.status === 'rejected').map(reason => reason.reason);

        if (successUploads.length > 0) {
            const productImages = successUploads.map((upload, index) => {
                const image: Partial<ProductImage> = {
                    imageUrl: upload.url,
                    order: index + lastProductImage?.order || 0,
                    product,
                };
                return image;
            });
            await this.productImageRepository.createMultiple(productImages);
        }

        return { successUploads, failedUploads };
    }
}