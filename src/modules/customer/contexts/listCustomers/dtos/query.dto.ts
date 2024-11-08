import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class ListCustomersQueryDTO {
    @ApiProperty({
        description: 'Page number',
        example: 1,
        required: false,
        default: 1
    })
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => parseInt(value))
    page?: number = 1;

    @ApiProperty({
        description: 'Items per page',
        example: 10,
        required: false,
        default: 10
    })
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => parseInt(value))
    size?: number = 10;

    @ApiProperty({
        description: 'Sort direction',
        enum: ['ASC', 'DESC'],
        required: false,
        default: 'ASC'
    })
    @IsOptional()
    @IsEnum(['ASC', 'DESC'])
    sort?: 'ASC' | 'DESC' = 'ASC';

    @ApiProperty({
        description: 'Field to order by',
        example: 'name',
        required: false,
        default: 'name'
    })
    @IsOptional()
    @IsString()
    orderBy?: string = 'name';
} 