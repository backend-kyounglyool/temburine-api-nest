/*
  Warnings:

  - Added the required column `status` to the `s3_content` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UploadStatus" AS ENUM ('READY', 'UPLOADING');

-- AlterTable
ALTER TABLE "s3_content" ADD COLUMN     "status" "UploadStatus" NOT NULL;
