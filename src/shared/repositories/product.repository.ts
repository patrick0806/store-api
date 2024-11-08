import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { Product } from "@shared/entities/product/product.entity";
import { DataSource, ILike, Repository } from "typeorm";

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
    private productRepository: Repository<Product>

    constructor(dataSource: DataSource) {
        super(dataSource.getRepository(Product))
        this.productRepository = dataSource.getRepository(Product);
    }

    async findById(id: number): Promise<Product | null> {
        return this.productRepository.findOne({
            where: { id }, relations: {
                category: true,
                images: true
            }
        });
    }

    async findBySku(sku: string): Promise<Product | null> {
        return this.productRepository.findOne({ where: { sku } });
    }

    async findByLabel(label: string): Promise<Product | null> {
        return this.productRepository.findOne({
            where: { label }, relations: {
                category: true,
                images: true
            }
        });
    }

    async listProducts({ page, size, name, categoryId }) {
        return this.productRepository.findAndCount({
            relations: {
                category: true,
                images: true,
            },
            where: {
                name: name ? ILike(`%${name}%`) : null,
                category: { id: categoryId ? categoryId : null }
            },
            skip: size * page,
            take: size
        });
    }
} 