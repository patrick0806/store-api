import { ApiProperty } from "@nestjs/swagger";

export class ProductCategoryDTO {
    @ApiProperty({
        description: 'Category ID',
        example: 1
    })
    id: number;

    @ApiProperty({
        description: 'Category name',
        example: 'Electronics'
    })
    name: string;

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