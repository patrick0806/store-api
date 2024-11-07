import { Module } from "@nestjs/common";
import { CustomerRepository } from "@shared/repositories/customer.repository";
import { CreateCustomerController } from "./contexts/createCustomer/createCustomer.controller";
import { CreateCustomerService } from "./contexts/createCustomer/createCustomer.service";

@Module({
    imports: [],
    controllers: [CreateCustomerController],
    providers: [CreateCustomerService, CustomerRepository],
})
export class CustomerModule { }