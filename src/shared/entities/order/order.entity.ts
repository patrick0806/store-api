import { Column, Entity, JoinColumn, ManyToOne, Relation } from "typeorm";
import { BaseEntity } from "../base.entity";
import { Customer } from "../customer.entity";
import { OrderShipment } from "./orderShipment.entity";
import { OrderPayment } from "./orderPayment.entity";

@Entity('orders')
export class Order extends BaseEntity {

    @Column({
        name: 'code',
        type: 'varchar',
        length: 36,
        unique: true,
        nullable: false,
    })
    code: string;

    @ManyToOne(type => Customer, {
        nullable: false,
        cascade: false,
    })
    @JoinColumn({ name: 'customer_id' })
    customer: Relation<Customer>;

    @Column(type => OrderPayment, { prefix: false })
    paymentDetails: OrderPayment;

    @Column(type => OrderShipment, { prefix: false })
    shipmentDetails: OrderShipment;

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