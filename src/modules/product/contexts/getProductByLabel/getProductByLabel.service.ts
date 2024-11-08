import { Injectable } from "@nestjs/common";
import { ProductDTO } from "@shared/dtos/product/product.dto";
import { EntityNotFoundException } from "@shared/exceptions/entityNotFound.exception";
import { ProductRepository } from "@shared/repositories/product.repository";
import { plainToClass } from "class-transformer";

@Injectable()
export class GetProductByLabelService {
    constructor(private productRepository: ProductRepository) { }

    async execute(label: string): Promise<ProductDTO> {
        const product = await this.productRepository.findByLabel(label);
        if (!product) throw new EntityNotFoundException('Not found product with this label');
        return plainToClass(ProductDTO, product);
    }
}