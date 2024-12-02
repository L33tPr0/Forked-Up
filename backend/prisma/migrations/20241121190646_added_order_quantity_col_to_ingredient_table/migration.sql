/*
  Warnings:

  - You are about to drop the column `quantity` on the `ingredients` table. All the data in the column will be lost.
  - Added the required column `quantity_on_hand` to the `ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity_to_order` to the `ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "quantity",
ADD COLUMN     "quantity_on_hand" DECIMAL(64,2) NOT NULL,
ADD COLUMN     "quantity_to_order" DECIMAL(64,2) NOT NULL;
