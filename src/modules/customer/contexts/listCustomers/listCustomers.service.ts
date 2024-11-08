import { Injectable } from "@nestjs/common";
import { CustomerRepository } from "@shared/repositories/customer.repository";
import { ListCustomersQueryDTO } from "./dtos/query.dto";
import { ListCustomersResponseDTO } from "./dtos/response.dto";
import { plainToClass } from "class-transformer";
import { CustomerDTO } from "@shared/dtos/customer.dto";

@Injectable()
export class ListCustomersService {
    constructor(private customerRepository: CustomerRepository) { }

    async execute(query: ListCustomersQueryDTO): Promise<ListCustomersResponseDTO> {
        const { page = 1, size = 10, sort = 'ASC', orderBy = 'name' } = query;

        const result = await this.customerRepository.findAll({
            page,
            size,
            sort,
            orderBy,
        });

        return {
            ...result,
            content: result.content.map(customer =>
                plainToClass(CustomerDTO, customer)
            )
        };
    }
} 