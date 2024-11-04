import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../base.entity";
import { Customer } from "../customer.entity";

@Entity('order_items')
export class OrderItem extends BaseEntity {

    @ManyToOne(type => Customer, {
        nullable: false,
        cascade: false,
    })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @Column({
        name: 'approval_date',
        type: 'timestamp',
        unique: false,
        nullable: true,
    })
    approvalDate?: Date;

    @Column({
        name: 'cancellation_date',
        type: 'timestamp',
        unique: false,
        nullable: true,
    })
    cancellationDate?: Date;
}