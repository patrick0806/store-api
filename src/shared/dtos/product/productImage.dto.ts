import { ApiProperty } from "@nestjs/swagger";

export class ProductImageDTO {
    @ApiProperty({
        description: 'Image ID',
        example: 1
    })
    id: number;

    @ApiProperty({
        description: 'Image URL',
        example: 'https://example.com/images/product-1.jpg'
    })
    url: string;

    @ApiProperty({
        description: 'Product ID reference',
        example: 1
    })
    productId: number;

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