import { Customer } from "@shared/entities/customer.entity";
import { Order } from "@shared/entities/order/order.entity";
import { OrderItem } from "@shared/entities/order/orderItem.entity";
import { PaymentStatus } from "@shared/enums/order/paymentStatus.enum";
import { PaymentType } from "@shared/enums/order/paymentType.enum";
import { ShippingType } from "@shared/enums/order/shippingType.enum";

export const ordersData: Order[] = [
    {
        id: 1,
        customer: { id: 1 } as Customer,
        paymentDetails: {
            discount: 0,
            installments: 1,
            paymentStatus: PaymentStatus.IN_PROCESS,
            paymentType: PaymentType.CREDIT_CARD,
            total: 130,
        },
        shipmentDetails: {
            customerName: 'Nome do recebedor da entrega',
            shippingCity: 'São João da Boa Vista',
            shippingNeighborhood: 'Jardim Crepusculo',
            shippingState: 'SP',
            shippingStreetAddress: 'Terezina da Silva Paulino',
            shippingStreetNumber: '208',
            shippingType: ShippingType.PAC,
            shippingZipAddress: '13875286',
            shippingPrice: 19.70,
        },
        createdAt: new Date('2024-03-01'),
        updatedAt: new Date('2024-03-01'),
        version: 1,
        code: "9486418964",
        items: [] as OrderItem[]
    },
    {
        id: 2,
        customer: { id: 2 } as Customer,
        paymentDetails: {
            discount: 0,
            installments: 1,
            paymentStatus: PaymentStatus.IN_PROCESS,
            paymentType: PaymentType.CREDIT_CARD,
            total: 130,
        },
        shipmentDetails: {
            customerName: 'Nome do recebedor da entrega',
            shippingCity: 'São João da Boa Vista',
            shippingNeighborhood: 'Jardim Crepusculo',
            shippingState: 'SP',
            shippingStreetAddress: 'Terezina da Silva Paulino',
            shippingStreetNumber: '208',
            shippingType: ShippingType.PAC,
            shippingZipAddress: '13875286',
            shippingPrice: 19.70,
        },
        createdAt: new Date('2024-03-15'),
        updatedAt: new Date('2024-03-15'),
        version: 1,
        code: "9486418965",
        items: [] as OrderItem[]
    },
    {
        id: 3,
        customer: { id: 1 } as Customer,
        paymentDetails: {
            discount: 0,
            installments: 1,
            paymentStatus: PaymentStatus.IN_PROCESS,
            paymentType: PaymentType.CREDIT_CARD,
            total: 130,
        },
        shipmentDetails: {
            customerName: 'Nome do recebedor da entrega',
            shippingCity: 'São João da Boa Vista',
            shippingNeighborhood: 'Jardim Crepusculo',
            shippingState: 'SP',
            shippingStreetAddress: 'Terezina da Silva Paulino',
            shippingStreetNumber: '208',
            shippingType: ShippingType.PAC,
            shippingZipAddress: '13875286',
            shippingPrice: 19.70,
        },
        createdAt: new Date('2024-03-18'),
        updatedAt: new Date('2024-03-18'),
        version: 1,
        code: "9486418966",
        items: [] as OrderItem[]
    }
]; 