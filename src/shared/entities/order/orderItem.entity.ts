import { Column, Entity, JoinColumn, ManyToOne, Relation } from "typeorm";
import { BaseEntity } from "../base.entity";
import { Product } from "../product/product.entity";
import { Order } from "./order.entity";

@Entity('order_items')
export class OrderItem extends BaseEntity {

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product

    @Column({
        name: 'quantity',
        type: 'int',
        nullable: false
    })
    quantity: number;

    @Column({
        name: 'price',
        type: 'decimal',
        precision: 2,
        nullable: false
    })
    price: number;

    // discount applied on each item
    // total = (price * amount) - (discount * amount)
    @Column({
        name: 'discount',
        precision: 2,
        nullable: false,
    })
    discount: number;

    @ManyToOne(() => Order, order => order.items)
    @JoinColumn({ name: 'order_id' })
    order: Relation<Order>;
}