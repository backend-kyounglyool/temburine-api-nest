/*
  Warnings:

  - Added the required column `type` to the `s3_content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "s3_content" ADD COLUMN     "type" TEXT NOT NULL;
