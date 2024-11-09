import { Product } from "@shared/entities/product/product.entity";
import { ProductImage } from "@shared/entities/product/productImage.entity";

export const productImagesData: ProductImage[] = [
    {
        id: 1,
        imageUrl: 'https://fastly.picsum.photos/id/301/200/300.jpg',
        product: { id: 1 } as Product,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1,
        order: 1
    },
    {
        id: 2,
        imageUrl: 'https://fastly.picsum.photos/id/302/200/300.jpg',
        product: { id: 1 } as Product,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1,
        order: 2
    },
    {
        id: 3,
        imageUrl: 'https://fastly.picsum.photos/id/303/200/300.jpg',
        product: { id: 2 } as Product,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1,
        order: 1
    },
    {
        id: 4,
        imageUrl: 'https://fastly.picsum.photos/id/304/200/300.jpg',
        product: { id: 3 } as Product,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1,
        order: 1
    }
]; 