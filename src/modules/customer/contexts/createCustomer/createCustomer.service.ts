import { Injectable } from "@nestjs/common";
import { CustomerRepository } from "@shared/repositories/customer.repository";
import { CreateCustomerRequestDTO } from "./dtos/request.dto";
import { CustomerDTO } from "@shared/dtos/customer.dto";
import { EntityInUseException } from "@shared/exceptions/EntityInUse.exception";
import { generateHash } from "@shared/utils/hash.util";
import { plainToClass } from "class-transformer";

@Injectable()
export class CreateCustomerService {
    constructor(private customerRepository: CustomerRepository) { }

    async execute(newCustomerData: CreateCustomerRequestDTO): Promise<CustomerDTO> {
        const alreadyExists = await this.customerRepository.findByEmail(newCustomerData.email);
        if (alreadyExists) {
            throw new EntityInUseException('Already exists a user create with this email in database');
        }

        newCustomerData.password = generateHash(newCustomerData.password);
        const createdCustomer = await this.customerRepository.create(newCustomerData);

        return plainToClass(CustomerDTO, createdCustomer);
    }
}