import { Product } from "@shared/entities/product/product.entity";
import { ProductCategory } from "@shared/entities/product/productCategory.entity";
import { ProductImage } from "@shared/entities/product/productImage.entity";

export const productsData: Product[] = [
    {
        id: 1,
        name: 'Caneca Mágica Personalizada',
        description: 'Caneca que muda de cor com líquido quente',
        price: 49.90,
        stock: 100,
        category: { id: 1 } as ProductCategory,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1,
        sku: "SKU-258463",
        label: "caneca-magica-personaliza",
        discount: 0,
        images: [],
        isActive: false
    },
    {
        id: 2,
        name: 'Caneca Branca Simples',
        description: 'Caneca cerâmica branca para sublimação',
        price: 29.90,
        stock: 200,
        category: { id: 2 } as ProductCategory,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1,
        sku: "SKU-258464",
        label: "caneca-branca-simples",
        discount: 0,
        images: [],
        isActive: false
    },
    {
        id: 3,
        name: 'Caneca Mágica Preta',
        description: 'Caneca mágica com base preta',
        price: 54.90,
        stock: 75,
        category: { id: 1 } as ProductCategory,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1,
        sku: "SKU-258465",
        label: "caneca-magica-preta",
        discount: 0,
        images: [

        ],
        isActive: false
    }
]; 