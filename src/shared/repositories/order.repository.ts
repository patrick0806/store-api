import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { Order } from "@shared/entities/order/order.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class OrderRepository extends BaseRepository<Order> {
    private orderRepository: Repository<Order>

    constructor(dataSource: DataSource) {
        super(dataSource.getRepository(Order))
        this.orderRepository = dataSource.getRepository(Order);
    }
} 