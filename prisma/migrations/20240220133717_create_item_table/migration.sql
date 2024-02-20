-- CreateTable
CREATE TABLE "item" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "item_category_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "comment" TEXT,
    "interval" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_item_category_id_fkey" FOREIGN KEY ("item_category_id") REFERENCES "item_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
