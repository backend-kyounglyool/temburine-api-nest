/*
  Warnings:

  - Added the required column `content_id` to the `item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "item" ADD COLUMN     "content_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "s3_content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
