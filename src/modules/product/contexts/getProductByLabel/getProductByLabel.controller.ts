import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { API_TAGS } from "@shared/constants";
import { Public } from "@shared/decorators";
import { GetProductByLabelService } from "./getProductByLabel.service";
import { Controller, Get, HttpStatus, Param } from "@nestjs/common";
import { ProductDTO } from "@shared/dtos/product/product.dto";

@Public()
@ApiTags(API_TAGS.PRODUCT)
@Controller()
export class GetProductByLabelController {
    constructor(private getProductByLabelService: GetProductByLabelService) { }

    @Get("/:label")
    @ApiOperation({ summary: 'Get product by label' })
    @ApiResponse({ status: HttpStatus.OK, type: ProductDTO })
    async handler(@Param('label') label: string) {
        return this.getProductByLabelService.execute(label);
    }
}