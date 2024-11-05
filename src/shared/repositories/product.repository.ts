import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { Product } from "@shared/entities/product/product.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
    private productRepository: Repository<Product>

    constructor(dataSource: DataSource) {
        super(dataSource.getRepository(Product))
        this.productRepository = dataSource.getRepository(Product);
    }
} 