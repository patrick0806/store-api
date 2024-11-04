import { MigrationInterface, QueryRunner } from "typeorm";

export class AddApprovalCancelDate1730752901748 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          ALTER TABLE "orders"
            ADD COLUMN IF NOT EXISTS "approval_date" TIMESTAMP WITH TIME ZONE,
            ADD COLUMN IF NOT EXISTS "cancellation_date" TIMESTAMP WITH TIME ZONE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          ALTER TABLE "orders"
            DROP COLUMN IF EXISTS "approval_date",
            DROP COLUMN IF EXISTS "cancellation_date"
        `);
    }

}
