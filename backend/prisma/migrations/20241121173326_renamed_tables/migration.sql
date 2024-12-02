/*
  Warnings:

  - You are about to drop the `Entries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ingredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Inventories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Menus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Owners` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Restaurants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EntriesToIngredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EntriesToMenus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Inventories" DROP CONSTRAINT "Inventories_restaurant_id_fkey";

-- DropForeignKey
ALTER TABLE "Menus" DROP CONSTRAINT "Menus_restaurant_id_fkey";

-- DropForeignKey
ALTER TABLE "Restaurants" DROP CONSTRAINT "Restaurants_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "_EntriesToIngredients" DROP CONSTRAINT "_EntriesToIngredients_A_fkey";

-- DropForeignKey
ALTER TABLE "_EntriesToIngredients" DROP CONSTRAINT "_EntriesToIngredients_B_fkey";

-- DropForeignKey
ALTER TABLE "_EntriesToMenus" DROP CONSTRAINT "_EntriesToMenus_A_fkey";

-- DropForeignKey
ALTER TABLE "_EntriesToMenus" DROP CONSTRAINT "_EntriesToMenus_B_fkey";

-- DropTable
DROP TABLE "Entries";

-- DropTable
DROP TABLE "Ingredients";

-- DropTable
DROP TABLE "Inventories";

-- DropTable
DROP TABLE "Menus";

-- DropTable
DROP TABLE "Owners";

-- DropTable
DROP TABLE "Restaurants";

-- DropTable
DROP TABLE "_EntriesToIngredients";

-- DropTable
DROP TABLE "_EntriesToMenus";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Fresh Start',
    "owner_id" INTEGER NOT NULL,
    "has_carryout" BOOLEAN NOT NULL,
    "seating_capacity" INTEGER,
    "is_for_sale" BOOLEAN NOT NULL,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventories" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,

    CONSTRAINT "inventories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menus" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,

    CONSTRAINT "menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" MONEY NOT NULL,
    "is_gluten_free" BOOLEAN NOT NULL,
    "is_daily_special" BOOLEAN NOT NULL,
    "calories" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cost" MONEY NOT NULL,
    "type" TEXT NOT NULL,
    "auto_ship" BOOLEAN NOT NULL,
    "quantity" DECIMAL(64,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EntryToMenu" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EntryToIngredient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_hashedPassword_key" ON "users"("hashedPassword");

-- CreateIndex
CREATE UNIQUE INDEX "inventories_restaurant_id_key" ON "inventories"("restaurant_id");

-- CreateIndex
CREATE UNIQUE INDEX "menus_restaurant_id_key" ON "menus"("restaurant_id");

-- CreateIndex
CREATE UNIQUE INDEX "_EntryToMenu_AB_unique" ON "_EntryToMenu"("A", "B");

-- CreateIndex
CREATE INDEX "_EntryToMenu_B_index" ON "_EntryToMenu"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EntryToIngredient_AB_unique" ON "_EntryToIngredient"("A", "B");

-- CreateIndex
CREATE INDEX "_EntryToIngredient_B_index" ON "_EntryToIngredient"("B");

-- AddForeignKey
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryToMenu" ADD CONSTRAINT "_EntryToMenu_A_fkey" FOREIGN KEY ("A") REFERENCES "entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryToMenu" ADD CONSTRAINT "_EntryToMenu_B_fkey" FOREIGN KEY ("B") REFERENCES "menus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryToIngredient" ADD CONSTRAINT "_EntryToIngredient_A_fkey" FOREIGN KEY ("A") REFERENCES "entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryToIngredient" ADD CONSTRAINT "_EntryToIngredient_B_fkey" FOREIGN KEY ("B") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
