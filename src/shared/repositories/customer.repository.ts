import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { Customer } from "@shared/entities/customer.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class CustomerRepository extends BaseRepository<Customer> {
    private customerRepository: Repository<Customer>
    constructor(datasouce: DataSource) {
        super(datasouce)
        this.customerRepository = datasouce.getRepository(Customer);
    }
}