import { Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { ProductRepository } from "@shared/repositories/product.repository";
import { EntityInUseException } from "@shared/exceptions/entityInUse.exception";
import { ProductDTO } from "@shared/dtos/product/product.dto";
import { CreateProductRequestDTO } from "./dtos/request.dto";

@Injectable()
export class CreateProductService {
    constructor(private productRepository: ProductRepository) { }

    async execute(productData: CreateProductRequestDTO): Promise<ProductDTO> {
        const alreadyExists = await this.productRepository.findBySku(productData.sku);
        if (alreadyExists) {
            throw new EntityInUseException('Already exists a product with this sku');
        }
        const product = await this.productRepository.create(productData);
        return plainToClass(ProductDTO, product);
    }
}