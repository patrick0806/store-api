import { Order } from "@shared/entities/order/order.entity";
import { OrderItem } from "@shared/entities/order/orderItem.entity";
import { Product } from "@shared/entities/product/product.entity";

export const orderItemsData: OrderItem[] = [
    {
        id: 1,
        order: { id: 1 } as Order,
        product: { id: 1 } as Product,
        quantity: 2,
        price: 49.90,
        createdAt: new Date('2024-03-01'),
        updatedAt: new Date('2024-03-01'),
        version: 1,
        discount: 0
    },
    {
        id: 2,
        order: { id: 1 } as Order,
        product: { id: 2 } as Product,
        quantity: 1,
        price: 29.90,
        createdAt: new Date('2024-03-01'),
        updatedAt: new Date('2024-03-01'),
        version: 1,
        discount: 0
    },
    {
        id: 3,
        order: { id: 2 } as Order,
        product: { id: 3 } as Product,
        quantity: 1,
        price: 54.90,
        createdAt: new Date('2024-03-15'),
        updatedAt: new Date('2024-03-15'),
        version: 1,
        discount: 0
    },
    {
        id: 4,
        order: { id: 3 } as Order,
        product: { id: 2 } as Product,
        quantity: 3,
        price: 29.90,
        createdAt: new Date('2024-03-18'),
        updatedAt: new Date('2024-03-18'),
        version: 1,
        discount: 0
    }
]; 