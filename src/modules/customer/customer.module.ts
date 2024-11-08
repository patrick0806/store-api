import { Module } from "@nestjs/common";
import { CustomerRepository } from "@shared/repositories/customer.repository";
import { CreateCustomerController } from "./contexts/createCustomer/createCustomer.controller";
import { CreateCustomerService } from "./contexts/createCustomer/createCustomer.service";
import { ListCustomersController } from "./contexts/listCustomers/listCustomers.controller";
import { ListCustomersService } from "./contexts/listCustomers/listCustomers.service";

@Module({
    imports: [],
    controllers: [CreateCustomerController, ListCustomersController],
    providers: [CreateCustomerService, ListCustomersService, CustomerRepository],
})
export class CustomerModule { }