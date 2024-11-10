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

    async listOrders({ page, size, orderCode }) {
        return this.orderRepository.findAndCount({
            relations: {
                items: true,
                customer: true,
            },
            where: {
                code: orderCode ? orderCode : null,
            },
            skip: size * (page - 1),
            take: size
        });
    }

    async listCustomerOrders({ page, size, customerId, paymentStatus = null }) {
        return this.orderRepository.findAndCount({
            relations: {
                items: true,
                customer: true,
            },
            where: {
                customer: { id: customerId },
                paymentDetails: { paymentStatus: paymentStatus ? paymentStatus : null }
            },
            order: { createdAt: 'DESC' },
            skip: size * (page - 1),
            take: size
        });
    }
} 