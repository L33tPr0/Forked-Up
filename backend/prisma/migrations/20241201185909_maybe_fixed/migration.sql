-- DropForeignKey
ALTER TABLE "inventories" DROP CONSTRAINT "inventories_restaurant_id_fkey";

-- AddForeignKey
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
