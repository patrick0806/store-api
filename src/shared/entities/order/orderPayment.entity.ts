import { PaymentStatus } from '@shared/enums/order/paymentStatus.enum';
import { PaymentType } from '@shared/enums/order/paymentType.enum';
import { Column } from 'typeorm';
export class OrderPayment {
    @Column({
        name: 'discount',
        precision: 2,
        nullable: false
    })
    discount: number;

    @Column({
        name: 'total',
        precision: 2,
        nullable: false
    })
    total: number;

    @Column({
        name: 'payment_type',
        type: 'varchar',
        length: 60,
        nullable: false,
    })
    paymentType: PaymentType;

    @Column({
        name: 'payment_status',
        type: 'varchar',
        length: 60,
        nullable: false,
    })
    paymentStatus: PaymentStatus;

    @Column({
        name: 'installments',
        type: 'int',
        nullable: false,
    })
    installments: number;
}