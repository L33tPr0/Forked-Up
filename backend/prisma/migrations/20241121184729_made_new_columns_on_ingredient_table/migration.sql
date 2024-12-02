/*
  Warnings:

  - You are about to drop the column `type` on the `ingredients` table. All the data in the column will be lost.
  - Added the required column `ingredient_type` to the `ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_type` to the `ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "type",
ADD COLUMN     "ingredient_type" TEXT NOT NULL,
ADD COLUMN     "unit_type" TEXT NOT NULL;
