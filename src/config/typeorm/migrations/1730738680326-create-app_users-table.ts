import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAppUsersTable1730738680326 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE app_user (
            id SERIAL PRIMARY KEY,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            version INT NOT NULL DEFAULT 1,
            name VARCHAR(75) NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            password VARCHAR(150) NOT NULL,
            is_active BOOLEAN NOT NULL DEFAULT TRUE
          );
        `);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE app_user;`);
    }
}
