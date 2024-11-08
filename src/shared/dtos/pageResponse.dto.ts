import { ApiProperty } from "@nestjs/swagger";

export class PageResponse<T> {
    @ApiProperty({ description: 'Page to search', example: 0 })
    page: number;

    @ApiProperty({ description: 'Page size', example: 10 })
    size: number;

    @ApiProperty({ description: 'Total items matched with search', example: 100 })
    totalElements: number;

    @ApiProperty({ description: 'Total of pages for see all content', example: 10 })
    totalPages: number;

    @ApiProperty({ description: 'Content', example: [] })
    content: T[]
}