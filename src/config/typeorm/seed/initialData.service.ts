import { Logger } from '@nestjs/common';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { dataSource } from '@config/typeorm/dataSource';

import { User } from '@shared/entities/user.entity';
import { Customer } from '@shared/entities/customer.entity';
import { ProductCategory } from '@shared/entities/product/productCategory.entity';
import { Product } from '@shared/entities/product/product.entity';
import { ProductImage } from '@shared/entities/product/productImage.entity';
import { Order } from '@shared/entities/order/order.entity';
import { OrderItem } from '@shared/entities/order/orderItem.entity';

import { usersData } from './data/users';
import { customersData } from './data/customers';
import { productCategoryData } from './data/productCategory';
import { productsData } from './data/product';
import { productImagesData } from './data/productImages';
import { ordersData } from './data/orders';
import { orderItemsData } from './data/orderItems';

export class InitialDataSeed {
    private logger: Logger;
    private queryRunner: QueryRunner;

    private userRepository: Repository<User>;
    private customerRepository: Repository<Customer>;
    private productCategoryRepository: Repository<ProductCategory>;
    private productRepository: Repository<Product>;
    private productImageRepository: Repository<ProductImage>;
    private orderRepository: Repository<Order>;
    private orderItemRepository: Repository<OrderItem>;

    public async execute(): Promise<void> {
        this.logger = new Logger(InitialDataSeed.name);
        await this.initializeRepositories(dataSource);

        try {
            await this.queryRunner.connect();
            await this.queryRunner.startTransaction();

            await this.userRepository.save(usersData);
            this.logger.log('Users seeded');

            await this.customerRepository.save(customersData);
            this.logger.log('Customers seeded');

            await this.productCategoryRepository.save(productCategoryData);
            this.logger.log('Product Categories seeded');

            await this.productRepository.save(productsData);
            this.logger.log('Products seeded');


            await this.orderRepository.save(ordersData);
            this.logger.log('Orders seeded');

            /*
            await this.orderItemRepository.save(orderItemsData);
            this.logger.log('Order Items seeded');*/

            await this.productImageRepository.save(productImagesData);
            this.logger.log('Product Images seeded');

            await this.queryRunner.commitTransaction();
            this.logger.log('Transaction committed');
        } catch (error) {
            await this.queryRunner.rollbackTransaction();
            this.logger.error(error);
            this.logger.log('Transaction rolled back');
            throw error;
        } finally {
            await this.queryRunner.release();
        }
    }

    private async initializeRepositories(dataSource: DataSource) {
        this.logger.log('Initializing repositories');

        await dataSource.initialize();
        this.queryRunner = dataSource.createQueryRunner();

        this.userRepository = dataSource.getRepository(User);
        this.customerRepository = dataSource.getRepository(Customer);
        this.productCategoryRepository = dataSource.getRepository(ProductCategory);
        this.productRepository = dataSource.getRepository(Product);
        this.productImageRepository = dataSource.getRepository(ProductImage);
        this.orderRepository = dataSource.getRepository(Order);
        this.orderItemRepository = dataSource.getRepository(OrderItem);
    }
}