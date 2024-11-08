import { Module } from "@nestjs/common";
import { CreateProductController } from "./contexts/createProduct/createProduct.controller";
import { CreateProductService } from "./contexts/createProduct/createProduct.service";
import { ProductRepository } from "@shared/repositories/product.repository";
import { FastifyMulterModule } from "@nest-lab/fastify-multer";
import { UploadImagesController } from "./contexts/uploadImages/uploadImages.controller";
import { UploadImagesService } from "./contexts/uploadImages/uploadImages.service";
import { ProductImageRepository } from "@shared/repositories/productImage.repository";
import { ImageKitProvider } from "@shared/providers/ImageKit.provider";

@Module({
    imports: [FastifyMulterModule],
    controllers: [CreateProductController, UploadImagesController],
    providers: [
        CreateProductService,
        UploadImagesService,
        ProductRepository,
        ProductImageRepository,
        {
            provide: 'ImageProvider',
            useClass: ImageKitProvider
        }
    ]
})
export class ProductModule { }