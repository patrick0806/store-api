import { Column, Entity, JoinColumn, OneToMany, Relation } from "typeorm";
import { BaseEntity } from "../base.entity";
import { Product } from "./product.entity";

@Entity('product_images')
export class ProductImage extends BaseEntity {
    @OneToMany(() => Product, product => product.images)
    @JoinColumn({ name: 'product_id' })
    product: Relation<Product>;

    @Column({
        name: 'image_url',
        type: 'varchar',
        length: 400,
        unique: true,
        nullable: false,
    })
    imageUrl: string;

    @Column({
        name: 'order',
        type: 'int',
        default: 0
    })
    order: number;
}