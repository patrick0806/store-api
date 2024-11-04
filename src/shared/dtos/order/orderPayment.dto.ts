import { ApiProperty } from "@nestjs/swagger";

export class OrderPaymentDTO {
    @ApiProperty({
        description: 'Payment ID',
        example: 1
    })
    id: number;

    @ApiProperty({
        description: 'Payment method',
        example: 'credit_card',
        enum: ['credit_card', 'debit_card', 'pix', 'bank_transfer']
    })
    paymentMethod: string;

    @ApiProperty({
        description: 'Payment status',
        example: 'pending',
        enum: ['pending', 'processing', 'completed', 'failed', 'refunded']
    })
    status: string;

    @ApiProperty({
        description: 'Payment transaction ID',
        example: 'txn_123456789'
    })
    transactionId: string;

    @ApiProperty({
        description: 'Payment amount',
        example: 1999.99
    })
    amount: number;

    @ApiProperty({
        description: 'Currency',
        example: 'BRL'
    })
    currency: string;

    @ApiProperty({
        description: 'Payment date',
        example: new Date()
    })
    paymentDate: Date;

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