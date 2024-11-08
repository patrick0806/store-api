import { Module } from "@nestjs/common";
import { CreateProductController } from "./contexts/createProduct/createProduct.controller";
import { CreateProductService } from "./contexts/createProduct/createProduct.service";
import { ProductRepository } from "@shared/repositories/product.repository";
import { FastifyMulterModule } from "@nest-lab/fastify-multer";
import { UploadImagesController } from "./contexts/uploadImages/uploadImages.controller";
import { UploadImagesService } from "./contexts/uploadImages/uploadImages.service";
import { ProductImageRepository } from "@shared/repositories/productImage.repository";
import { ImageKitProvider } from "@shared/providers/ImageKit.provider";
import { GetProductByLabelController } from "./contexts/getProductByLabel/getProductByLabel.controller";
import { GetProductByLabelService } from "./contexts/getProductByLabel/getProductByLabel.service";
import { ListProductsController } from "./contexts/listProducts/listProducts.controller";
import { ListProductService } from "./contexts/listProducts/listProducts.service";

@Module({
    imports: [FastifyMulterModule],
    controllers: [
        CreateProductController,
        UploadImagesController,
        ListProductsController,
        GetProductByLabelController,
    ],
    providers: [
        CreateProductService,
        UploadImagesService,
        ProductRepository,
        ListProductService,
        GetProductByLabelService,
        ProductImageRepository,
        {
            provide: 'ImageProvider',
            useClass: ImageKitProvider
        }
    ]
})
export class ProductModule { }