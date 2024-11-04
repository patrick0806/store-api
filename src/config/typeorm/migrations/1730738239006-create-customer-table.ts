import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCustomerTable1730738239006 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE customers (
            id SERIAL PRIMARY KEY,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            version INT NOT NULL DEFAULT 1,
            name VARCHAR(60) NOT NULL,
            email VARCHAR(60) UNIQUE NOT NULL,
            password VARCHAR(255),
            phone_number VARCHAR(24),
            is_active BOOLEAN NOT NULL DEFAULT TRUE
          );
        `);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE customers;`);
    }

}
