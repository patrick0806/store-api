import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { OrderItem } from "@shared/entities/order/orderItem.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class OrderItemRepository extends BaseRepository<OrderItem> {
    private orderItemRepository: Repository<OrderItem>

    constructor(dataSource: DataSource) {
        super(dataSource)
        this.orderItemRepository = dataSource.getRepository(OrderItem);
    }
} 