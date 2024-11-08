import { Injectable } from "@nestjs/common";
import { OrderDTO } from "@shared/dtos/order/order.dto";
import { PageResponse } from "@shared/dtos/pageResponse.dto";
import { OrderRepository } from "@shared/repositories/order.repository";
import { plainToClass } from "class-transformer";
import { ListOrdersQueryParamsDTO } from "./dtos/query.dto";

@Injectable()
export class ListOrdersService {
    constructor(private orderRepository: OrderRepository) { }

    async execute(customerId: number, searchFilters: ListOrdersQueryParamsDTO): Promise<PageResponse<OrderDTO>> {
        const [orders, totalElements] = await this.orderRepository.listCustomerOrders({ ...searchFilters, customerId });
        const totalPages = Math.ceil(totalElements / searchFilters.size);
        return {
            page: searchFilters.page,
            size: searchFilters.size,
            totalElements,
            totalPages,
            content: orders.map(product => plainToClass(OrderDTO, product))
        }
    }
}