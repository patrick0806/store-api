import { ApiProperty } from "@nestjs/swagger";
import { ProductImageDTO } from "./productImage.dto";
import { ProductCategoryDTO } from "./productCategory.dto";

export class ProductDTO {
    @ApiProperty({
        description: 'Product ID',
        example: 1
    })
    id: number;

    @ApiProperty({
        description: 'Product SKU',
        example: 'SKU-29466584'
    })
    sku: string;

    @ApiProperty({
        description: 'Product name',
        example: 'Gaming Laptop'
    })
    name: string;

    @ApiProperty({
        description: 'Product description',
        example: 'High-performance gaming laptop with RTX 4080'
    })
    description: string;

    @ApiProperty({
        description: 'product-name',
        example: 'gaming-laptop'
    })
    label: string;

    @ApiProperty({
        description: 'Product discount percentage',
        example: 0,
    })
    discount: number;

    @ApiProperty({
        description: 'Product Height (cm)',
        example: 10
    })
    height?: number;

    @ApiProperty({
        description: 'Product Width (cm)',
        example: 15
    })
    width?: number;

    @ApiProperty({
        description: 'Product Length (cm)',
        example: 5
    })
    length?: number;

    @ApiProperty({
        description: 'Product Weight (kg)',
        example: 0.8
    })
    weight?: number;

    @ApiProperty({
        description: 'Product price',
        example: 1999.99
    })
    price: number;

    @ApiProperty({
        description: 'Available stock',
        example: 10
    })
    stock: number;

    @ApiProperty({
        description: 'Product images',
        type: [ProductImageDTO]
    })
    images: ProductImageDTO[];

    @ApiProperty({
        description: 'Product category',
        type: ProductCategoryDTO
    })
    category: ProductCategoryDTO;

    @ApiProperty({
        description: 'Product activation status',
        example: true
    })
    isActive: boolean;

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