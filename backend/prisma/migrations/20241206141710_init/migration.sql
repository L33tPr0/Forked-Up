-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
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
    "name" TEXT NOT NULL DEFAULT 'Humble Beginnings',
    "owner_id" TEXT,
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
    "ingredient_type" TEXT NOT NULL,
    "auto_ship" BOOLEAN,
    "unit_type" TEXT NOT NULL,
    "quantity_on_hand" DECIMAL(64,2) NOT NULL,
    "quantity_to_order" DECIMAL(64,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EntryToMenu" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EntryToMenu_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_EntryToIngredient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EntryToIngredient_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_IngredientToInventory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_IngredientToInventory_AB_pkey" PRIMARY KEY ("A","B")
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
CREATE INDEX "_EntryToMenu_B_index" ON "_EntryToMenu"("B");

-- CreateIndex
CREATE INDEX "_EntryToIngredient_B_index" ON "_EntryToIngredient"("B");

-- CreateIndex
CREATE INDEX "_IngredientToInventory_B_index" ON "_IngredientToInventory"("B");

-- AddForeignKey
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryToMenu" ADD CONSTRAINT "_EntryToMenu_A_fkey" FOREIGN KEY ("A") REFERENCES "entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryToMenu" ADD CONSTRAINT "_EntryToMenu_B_fkey" FOREIGN KEY ("B") REFERENCES "menus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryToIngredient" ADD CONSTRAINT "_EntryToIngredient_A_fkey" FOREIGN KEY ("A") REFERENCES "entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryToIngredient" ADD CONSTRAINT "_EntryToIngredient_B_fkey" FOREIGN KEY ("B") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToInventory" ADD CONSTRAINT "_IngredientToInventory_A_fkey" FOREIGN KEY ("A") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToInventory" ADD CONSTRAINT "_IngredientToInventory_B_fkey" FOREIGN KEY ("B") REFERENCES "inventories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER SEQUENCE "ingredients_id_seq" MINVALUE 1 START 1 RESTART 1;
ALTER SEQUENCE "restaurants_id_seq" MINVALUE 1 START 1 RESTART 1;
ALTER SEQUENCE "inventories_id_seq" MINVALUE 1 START 1 RESTART 1;
ALTER SEQUENCE "menus_id_seq" MINVALUE 1 START 1 RESTART 1;
ALTER SEQUENCE "entries_id_seq" MINVALUE 1 START 1 RESTART 1;