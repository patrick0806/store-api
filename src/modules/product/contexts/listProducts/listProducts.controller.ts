import { Controller, Get, HttpStatus, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { API_TAGS } from "@shared/constants";
import { Public } from "@shared/decorators";
import { ListProductService } from "./listProducts.service";
import { PageResponse } from "@shared/dtos/pageResponse.dto";
import { ProductDTO } from "@shared/dtos/product/product.dto";
import { ListProductsQueryParamsDTO } from "./dtos/query.dto";

@Public()
@ApiTags(API_TAGS.PRODUCT)
@Controller()
export class ListProductsController {
    constructor(private listProductService: ListProductService) { }

    @Get()
    @ApiOperation({ summary: 'List products' })
    @ApiResponse({ status: HttpStatus.OK, type: PageResponse<ProductDTO> })
    async handler(
        @Query() searchParams: ListProductsQueryParamsDTO
    ) {
        return this.listProductService.execute(searchParams);
    }

}