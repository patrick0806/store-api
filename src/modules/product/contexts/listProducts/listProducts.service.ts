import { Injectable } from "@nestjs/common";
import { ProductRepository } from "@shared/repositories/product.repository";
import { ListProductsQueryParamsDTO } from "./dtos/query.dto";
import { PageResponse } from "@shared/dtos/pageResponse.dto";
import { ProductDTO } from "@shared/dtos/product/product.dto";
import { plainToClass } from "class-transformer";

@Injectable()
export class ListProductService {
    constructor(private productRepository: ProductRepository) { }

    async execute(searchFilters: ListProductsQueryParamsDTO): Promise<PageResponse<ProductDTO>> {
        const [products, totalElements] = await this.productRepository.listProducts(searchFilters);
        const totalPages = Math.ceil(totalElements / searchFilters.size);
        return {
            page: searchFilters.page,
            size: searchFilters.size,
            totalElements,
            totalPages,
            content: products.map(product => plainToClass(ProductDTO, product))
        }
    }
}