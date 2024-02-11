-- CreateTable
CREATE TABLE "agreement" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "is_agree_interval_notification" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agreement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "agreement_user_id_key" ON "agreement"("user_id");

-- AddForeignKey
ALTER TABLE "agreement" ADD CONSTRAINT "agreement_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
