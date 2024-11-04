import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrdersTable1730739401956 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table orders (
                id serial primary key,
                created_at timestamp with time zone,
                updated_at timestamp with time zone,
                version integer,
                code varchar(36) not null,
                customer_id integer not null,
                discount decimal(15,2) not null,
                total decimal(15,2) not null,
                payment_type varchar(60) not null,
                payment_status varchar(60) not null,
                installments integer not null,
                shipping_type varchar(60) not null,
                shipping_price varchar(60) not null,
                customer_name varchar(60) not null,
                shipping_street_address varchar(50) not null,
                shipping_street_number varchar(10) not null,
                shipping_street_number_2 varchar(20),
                shipping_neighborhood varchar(30) not null,
                shipping_city varchar(30) not null,
                shipping_state varchar(2) not null,
                shipping_zip_address varchar(8) not null,
                constraint order_customer foreign key (customer_id) references customers(id)
            );
        `);

        await queryRunner.query(`
            create table order_items (
                id serial primary key,
                created_at timestamp with time zone,
                updated_at timestamp with time zone,
                version integer,
                product_id integer not null,
                order_id integer not null,
                price decimal(15,2),
                discount decimal(15,2),
                quantity decimal(15,2),
                constraint order_items_product foreign key (product_id) references products(id),
                constraint order_items foreign key (order_id) references orders(id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`drop table order_item;`);
        await queryRunner.query(`drop table order;`);
    }
}
