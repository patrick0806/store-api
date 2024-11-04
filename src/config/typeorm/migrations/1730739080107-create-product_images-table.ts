import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductImagesTable1730739080107 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE product_images (
            id SERIAL PRIMARY KEY,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            version INT NOT NULL DEFAULT 1,
            product_id INTEGER NOT NULL REFERENCES products(id),
            image_url VARCHAR(400) NOT NULL UNIQUE,
            order_ INT NOT NULL DEFAULT 0
          );
        `);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE product_images;`);
    }
}
