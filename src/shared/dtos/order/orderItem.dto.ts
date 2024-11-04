import { ApiProperty } from "@nestjs/swagger";
import { ProductDTO } from "../product/product.dto";

export class OrderItemDTO {
    @ApiProperty({
        description: 'Order Item ID',
        example: 1
    })
    id: number;

    @ApiProperty({
        description: 'Product quantity',
        example: 2
    })
    quantity: number;

    @ApiProperty({
        description: 'Unit price at the time of purchase',
        example: 999.99
    })
    price: number;

    @ApiProperty({
        description: 'Product details',
        type: ProductDTO
    })
    product: ProductDTO;

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