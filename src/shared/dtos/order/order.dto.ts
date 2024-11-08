import { ApiProperty } from "@nestjs/swagger";
import { OrderItemDTO } from "./orderItem.dto";
import { CustomerDTO } from "../customer.dto";
import { OrderPaymentDTO } from "./orderPayment.dto";
import { OrderShipmentDTO } from "./orderShipment.dto";

export class OrderDTO {
    @ApiProperty({
        description: 'Order ID',
        example: 1
    })
    id: number;

    @ApiProperty({
        description: 'Order code',
        example: '9486418964'
    })
    code: string;

    @ApiProperty({
        description: 'Order status',
        example: 'pending',
        enum: ['pending', 'processing', 'completed', 'cancelled']
    })
    status: string;

    @ApiProperty({
        description: 'Order total amount',
        example: 1999.99
    })
    total: number;

    @ApiProperty({
        description: 'Customer who placed the order',
        type: CustomerDTO
    })
    customer: CustomerDTO;

    @ApiProperty({
        description: 'Order items',
        type: [OrderItemDTO]
    })
    items: OrderItemDTO[];

    @ApiProperty({
        description: 'Payment details',
        type: OrderPaymentDTO
    })
    payment: OrderPaymentDTO;

    @ApiProperty({
        description: 'Shipment details',
        type: OrderShipmentDTO
    })
    shipment: OrderShipmentDTO;

    @ApiProperty({
        description: 'Creation Date',
        example: new Date()
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Updated Date',
        example: new Date()
    })
    updatedAt: Date;

    @ApiProperty({
        description: 'Object version',
        example: 1
    })
    version: number;
}