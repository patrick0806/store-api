import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Relation } from "typeorm";
import { BaseEntity } from "../base.entity";
import { ProductCategory } from "./productCategory.entity";
import { ProductImage } from "./productImage.entity";

@Entity('products')
export class Product extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 24,
        unique: true,
        nullable: false,
    })
    sku: string;

    @Column({
        type: 'varchar',
        length: 60,
        nullable: false,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: '80',
        nullable: false,
        unique: true,
    })
    label: string;

    @ManyToOne(() => ProductCategory)
    @JoinColumn({ name: 'category_id' })
    category: Relation<ProductCategory>;

    @Column({
        type: 'text',
        default: '',
    })
    description: string;

    @Column({
        name: 'price',
        type: 'decimal',
        precision: 2,
        default: 0,
        nullable: false
    })
    price: number;

    @Column({
        name: 'discount',
        type: 'int',
        default: 0,
        nullable: false
    })
    discount: number;

    @Column({
        name: 'height',
        precision: 3,
        nullable: true,
    })
    height?: number;

    @Column({
        name: 'width',
        precision: 3,
        nullable: true,
    })
    width?: number;

    @Column({
        name: 'length',
        precision: 3,
        nullable: true,
    })
    length?: number;

    @Column({
        name: 'weight',
        precision: 3,
        nullable: true,
    })
    weight?: number;

    @Column({
        name: 'stock',
        type: 'int',
        nullable: false,
        default: 0
    })
    stock: number;

    @OneToMany(() => ProductImage, image => image.product)
    images: Relation<ProductImage[]>

    @Column({ name: 'is_active', default: true })
    isActive: boolean;
}