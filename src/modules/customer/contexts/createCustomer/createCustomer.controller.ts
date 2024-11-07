import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { API_TAGS } from "@shared/constants";
import { CustomerDTO } from "@shared/dtos/customer.dto";
import { CreateCustomerRequestDTO } from "./dtos/request.dto";
import { CreateCustomerService } from "./createCustomer.service";
import { Public } from "@shared/decorators";

@Public()
@ApiTags(API_TAGS.CUSTOMER)
@Controller()
export class CreateCustomerController {
    constructor(private createCustomerService: CreateCustomerService) { }

    @ApiOperation({ summary: 'Create a new Customer' })
    @ApiResponse({ status: HttpStatus.CREATED, type: CustomerDTO })
    @Post()
    async handle(
        @Body() newCustomer: CreateCustomerRequestDTO
    ) {
        return this.createCustomerService.execute(newCustomer);
    }
}