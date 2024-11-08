import { Module } from "@nestjs/common";
import { CreateProductController } from "./contexts/createProduct/createProduct.controller";
import { CreateProductService } from "./contexts/createProduct/createProduct.service";
import { ProductRepository } from "@shared/repositories/product.repository";

@Module({
    controllers: [CreateProductController],
    providers: [CreateProductService, ProductRepository]
})
export class ProductModule { }