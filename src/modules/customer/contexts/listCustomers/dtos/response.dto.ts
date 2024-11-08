import { ApiProperty } from "@nestjs/swagger";
import { CustomerDTO } from "@shared/dtos/customer.dto";

export class ListCustomersResponseDTO {
    @ApiProperty({
        description: 'Current page number',
        example: 1
    })
    page: number;

    @ApiProperty({
        description: 'Items per page',
        example: 10
    })
    size: number;

    @ApiProperty({
        description: 'Total number of items',
        example: 100
    })
    totalElements: number;

    @ApiProperty({
        description: 'Total number of pages',
        example: 10
    })
    totalPages: number;

    @ApiProperty({
        description: 'List of customers',
        type: [CustomerDTO]
    })
    content: CustomerDTO[];
} 