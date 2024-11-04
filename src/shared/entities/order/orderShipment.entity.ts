import { ShippingType } from '@shared/enums/order/shippingType.enum';
import { Column } from 'typeorm';

export class OrderShipment {
    @Column({
        name: 'shipping_type',
        type: 'varchar',
        length: 60,
        nullable: false,
    })
    shippingType: ShippingType;

    @Column({
        name: 'shipping_price',
        precision: 2,
        nullable: false,
    })
    shippingPrice: number;

    @Column({
        name: 'customer_name',
        type: 'varchar',
        length: 60,
        nullable: false,
    })
    customerName: string;

    @Column({
        name: 'shipping_street_address',
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    shippingStreetAddress: string;

    @Column({
        name: 'shipping_street_number',
        type: 'varchar',
        length: 10,
        nullable: false,
    })
    shippingStreetNumber: string;

    @Column({
        name: 'shipping_street_number_2',
        type: 'varchar',
        length: 20,
    })
    shippingStreetNumber2?: string;

    @Column({
        name: 'shipping_neighborhood',
        type: 'varchar',
        length: 30,
        nullable: false,
    })
    shippingNeighborhood: string;

    @Column({
        name: 'shipping_city',
        type: 'varchar',
        length: 30,
        nullable: false,
    })
    shippingCity: string;

    @Column({
        name: 'shipping_state',
        type: 'varchar',
        length: 2,
        nullable: false,
    })
    shippingState: string;

    @Column({
        name: 'shipping_zip_address',
        type: 'varchar',
        length: 8,
        nullable: false,
    })
    shippingZipAddress: string;
}