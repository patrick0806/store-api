import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { API_TAGS } from "@shared/constants";
import { Roles } from "@shared/decorators";
import { ApplicationRoles } from "@shared/enums";
import { CreateProductService } from "./createProduct.service";
import { ProductDTO } from "@shared/dtos/product/product.dto";
import { CreateProductRequestDTO } from "./dtos/request.dto";

@Roles(ApplicationRoles.ADMIN)
@ApiTags(API_TAGS.PRODUCT)
@Controller()
export class CreateProductController {
    constructor(private createProductService: CreateProductService) { }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create product' })
    @ApiResponse({ status: HttpStatus.CREATED, type: ProductDTO })
    @Post()
    async handler(
        @Body() productData: CreateProductRequestDTO
    ) {
        return this.createProductService.execute(productData);
    }
}