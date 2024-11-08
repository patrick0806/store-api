import { Controller, Get, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { API_TAGS } from "@shared/constants";
import { ListCustomersService } from "./listCustomers.service";
import { ListCustomersQueryDTO } from "./dtos/query.dto";
import { ListCustomersResponseDTO } from "./dtos/response.dto";
import { Roles } from "@shared/decorators";
import { ApplicationRoles } from "@shared/enums";

@Roles(ApplicationRoles.ADMIN)
@ApiTags(API_TAGS.CUSTOMER)
@Controller()
export class ListCustomersController {
    constructor(private listCustomersService: ListCustomersService) { }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'List all customers with pagination' })
    @ApiResponse({
        status: 200,
        type: ListCustomersResponseDTO,
        description: 'List of customers retrieved successfully'
    })
    @Get()
    async handle(
        @Query() query: ListCustomersQueryDTO
    ): Promise<ListCustomersResponseDTO> {
        return this.listCustomersService.execute(query);
    }
} 