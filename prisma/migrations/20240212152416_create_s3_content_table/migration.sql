-- CreateTable
CREATE TABLE "s3_content" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "s3_content_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "s3_content" ADD CONSTRAINT "s3_content_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
