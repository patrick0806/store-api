import { Controller, Get, HttpStatus, Param, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { API_TAGS } from "@shared/constants";
import { Roles } from "@shared/decorators";
import { ApplicationRoles } from "@shared/enums";
import { ListOrdersService } from "./listOrders.service";
import { PageResponse } from "@shared/dtos/pageResponse.dto";
import { OrderDTO } from "@shared/dtos/order/order.dto";
import { ListOrdersQueryParamsDTO } from "./dtos/query.dto";

@Roles(ApplicationRoles.CUSTOMER)
@ApiTags(API_TAGS.CUSTOMER)
@Controller()
export class ListOrdersController {
    constructor(private listOrdersService: ListOrdersService) { }

    @Get('/:customerId/orders')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'List customer order' })
    @ApiResponse({ status: HttpStatus.OK, type: PageResponse<OrderDTO> })
    async handler(
        @Param('customerId') customerId: number,
        @Query() searchFilters: ListOrdersQueryParamsDTO,
    ) {
        return this.listOrdersService.execute(customerId, searchFilters);
    }
}