/*
  Warnings:

  - You are about to drop the column `kakao_id` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[auth_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `auth_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `auth_type` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('KAKAO');

-- DropIndex
DROP INDEX "users_kakao_id_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "kakao_id",
ADD COLUMN     "auth_id" TEXT NOT NULL,
ADD COLUMN     "auth_type" "AuthType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_auth_id_key" ON "users"("auth_id");
