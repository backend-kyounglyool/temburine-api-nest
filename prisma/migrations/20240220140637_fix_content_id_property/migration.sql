-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_content_id_fkey";

-- AlterTable
ALTER TABLE "item" ALTER COLUMN "content_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "s3_content"("id") ON DELETE SET NULL ON UPDATE CASCADE;
