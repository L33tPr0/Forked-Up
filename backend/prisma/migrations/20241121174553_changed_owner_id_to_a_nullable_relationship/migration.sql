-- DropForeignKey
ALTER TABLE "restaurants" DROP CONSTRAINT "restaurants_owner_id_fkey";

-- AlterTable
ALTER TABLE "restaurants" ALTER COLUMN "owner_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
