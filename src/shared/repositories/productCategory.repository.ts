import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { ProductCategory } from "@shared/entities/product/productCategory.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class ProductCategoryRepository extends BaseRepository<ProductCategory> {
    private categoryRepository: Repository<ProductCategory>

    constructor(dataSource: DataSource) {
        super(dataSource)
        this.categoryRepository = dataSource.getRepository(ProductCategory);
    }
} 