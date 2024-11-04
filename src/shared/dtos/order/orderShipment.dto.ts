import { ApiProperty } from "@nestjs/swagger";

export class OrderShipmentDTO {
    @ApiProperty({
        description: 'Shipment ID',
        example: 1
    })
    id: number;

    @ApiProperty({
        description: 'Delivery address',
        example: 'Rua Example, 123'
    })
    address: string;

    @ApiProperty({
        description: 'City',
        example: 'São Paulo'
    })
    city: string;

    @ApiProperty({
        description: 'State',
        example: 'SP'
    })
    state: string;

    @ApiProperty({
        description: 'Postal code',
        example: '01234-567'
    })
    postalCode: string;

    @ApiProperty({
        description: 'Tracking code',
        example: 'BR123456789'
    })
    trackingCode: string;

    @ApiProperty({
        description: 'Delivery status',
        example: 'pending',
        enum: ['pending', 'shipped', 'delivered', 'returned']
    })
    deliveryStatus: string;

    @ApiProperty({
        description: 'Estimated delivery date',
        example: new Date()
    })
    estimatedDeliveryDate: Date;

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