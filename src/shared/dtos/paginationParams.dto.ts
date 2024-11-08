import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, Min } from "class-validator";

export class PaginationParamsDTO {
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @ApiProperty({ description: 'Page to search', example: 0 })
    page: number;

    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @ApiProperty({ description: 'Page Size', example: 10 })
    size: number;
}