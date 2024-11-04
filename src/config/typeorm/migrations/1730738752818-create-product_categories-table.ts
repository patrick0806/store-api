import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductCategoriesTable1730738752818 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE product_categories (
            id SERIAL PRIMARY KEY,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            version INT NOT NULL DEFAULT 1,
            name VARCHAR(30) NOT NULL
          );
        `);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE product_categories;`);
    }

}
