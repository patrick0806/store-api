import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { ProductImage } from "@shared/entities/product/productImage.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class ProductImageRepository extends BaseRepository<ProductImage> {
    private productImageRepository: Repository<ProductImage>

    constructor(dataSource: DataSource) {
        super(dataSource.getRepository(ProductImage))
        this.productImageRepository = dataSource.getRepository(ProductImage);
    }

    async findLastOrder(): Promise<ProductImage | null> {
        const productImage = await this.productImageRepository.createQueryBuilder('pi')
            .select('*')
            .orderBy('pi.order', 'DESC')
            .getMany();

        return productImage.length ? productImage[0] : null;
    }
} 