import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base.entity";

@Entity('product_categories')
export class ProductCategory extends BaseEntity {
    @Column({
        name: 'name',
        type: 'varchar',
        length: 30
    })
    name: string;
}