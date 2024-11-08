import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator";

class CategoryDTO {
    @IsNumber()
    @ApiProperty({
        description: 'Category ID',
        example: 1
    })
    id: number;

    @IsOptional()
    @ApiProperty({
        description: 'Category name',
        example: 'Electronics'
    })
    name: string;
}

export class CreateProductRequestDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Product SKU',
        example: 'SKU-29466584'
    })
    sku: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Product name',
        example: 'Gaming Laptop'
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Product description',
        example: 'High-performance gaming laptop with RTX 4080'
    })
    description: string;

    @IsNumber()
    @Min(1)
    @ApiProperty({
        description: 'Product price',
        example: 1999.99
    })
    price: number;

    @IsNumber()
    @Min(0)
    @ApiProperty({
        description: 'Available stock',
        example: 10
    })
    stock: number;

    @IsString()
    @ApiProperty({
        description: 'Product label (for url path)',
        example: 'gaming-laptop'
    })
    label: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @ApiProperty({
        description: 'Product discount percentage',
        example: 0,
    })
    discount: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @ApiProperty({
        description: 'Product Height (cm)',
        example: 10
    })
    height?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @ApiProperty({
        description: 'Product Width (cm)',
        example: 15
    })
    width?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @ApiProperty({
        description: 'Product Length (cm)',
        example: 5
    })
    length?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @ApiProperty({
        description: 'Product Weight (kg)',
        example: 0.8
    })
    weight?: number;

    @ValidateNested()
    @ApiProperty({
        description: 'Product category',
        type: CategoryDTO
    })
    category: CategoryDTO
}