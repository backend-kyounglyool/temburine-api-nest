-- AlterTable
ALTER TABLE "users" ALTER COLUMN "deleted_at" DROP NOT NULL,
ALTER COLUMN "auth_id" DROP NOT NULL;
