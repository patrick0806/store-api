import { ApiProperty } from "@nestjs/swagger";
import { PaginationParamsDTO } from "@shared/dtos/paginationParams.dto";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ListProductsQueryParamsDTO extends PaginationParamsDTO {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Product name', example: 'Notebook Lenovo', required: false })
    name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Product category', example: 'Computers', required: false })
    categoryId: number;
}