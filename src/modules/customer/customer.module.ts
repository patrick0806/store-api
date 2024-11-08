import { Module } from "@nestjs/common";
import { CustomerRepository } from "@shared/repositories/customer.repository";
import { CreateCustomerController } from "./contexts/createCustomer/createCustomer.controller";
import { CreateCustomerService } from "./contexts/createCustomer/createCustomer.service";
import { ListCustomersController } from "./contexts/listCustomers/listCustomers.controller";
import { ListCustomersService } from "./contexts/listCustomers/listCustomers.service";
import { OrderRepository } from "@shared/repositories/order.repository";
import { ListOrdersController } from "./contexts/listOrders/listOrders.controller";
import { ListOrdersService } from "./contexts/listOrders/listOrders.service";

@Module({
    imports: [],
    controllers: [
        CreateCustomerController,
        ListCustomersController,
        ListOrdersController
    ],
    providers: [
        CreateCustomerService,
        ListCustomersService,
        ListOrdersService,
        CustomerRepository,
        OrderRepository
    ],
})
export class CustomerModule { }