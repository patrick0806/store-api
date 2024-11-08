import { ApiProperty } from "@nestjs/swagger";
import { PaginationParamsDTO } from "@shared/dtos/paginationParams.dto";
import { PaymentStatus } from "@shared/enums/order/paymentStatus.enum";
import { IsEnum, IsOptional } from "class-validator";

export class ListOrdersQueryParamsDTO extends PaginationParamsDTO {
    @IsOptional()
    @IsEnum(PaymentStatus)
    @ApiProperty({ description: 'Product name', example: PaymentStatus.PENDING, enum: PaymentStatus, required: false })
    paymentStatus?: PaymentStatus;
}