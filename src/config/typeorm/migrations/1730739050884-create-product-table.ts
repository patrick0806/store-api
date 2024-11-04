import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductTable1730739050884 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            version INT NOT NULL DEFAULT 1,
            sku VARCHAR(24) NOT NULL UNIQUE,
            name VARCHAR(60) NOT NULL,
            label VARCHAR(80) NOT NULL UNIQUE,
            category_id INTEGER REFERENCES product_categories(id),
            description TEXT DEFAULT '',
            price DECIMAL(2) NOT NULL DEFAULT 0,
            discount INT NOT NULL DEFAULT 0,
            height NUMERIC(3),
            width NUMERIC(3),
            length NUMERIC(3),
            weight NUMERIC(3),
            stock INT NOT NULL DEFAULT 0,
            is_active BOOLEAN NOT NULL DEFAULT TRUE
          );
        `);

        await queryRunner.query(`
          CREATE INDEX idx_products_category ON products(category_id);
        `);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE products;`);
    }

}
