-- CreateTable
CREATE TABLE "Owners" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Fresh Start',
    "owner_id" INTEGER NOT NULL,
    "has_carryout" BOOLEAN NOT NULL,
    "seating_capacity" INTEGER,
    "is_for_sale" BOOLEAN NOT NULL,

    CONSTRAINT "Restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventories" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,

    CONSTRAINT "Inventories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menus" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,

    CONSTRAINT "Menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" MONEY NOT NULL,
    "is_gluten_free" BOOLEAN NOT NULL,
    "is_daily_special" BOOLEAN NOT NULL,
    "calories" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cost" MONEY NOT NULL,
    "type" TEXT NOT NULL,
    "auto_ship" BOOLEAN NOT NULL,
    "quantity" DECIMAL(64,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EntriesToMenus" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EntriesToIngredients" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Owners_email_key" ON "Owners"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Owners_username_key" ON "Owners"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Owners_hashedPassword_key" ON "Owners"("hashedPassword");

-- CreateIndex
CREATE UNIQUE INDEX "Inventories_restaurant_id_key" ON "Inventories"("restaurant_id");

-- CreateIndex
CREATE UNIQUE INDEX "Menus_restaurant_id_key" ON "Menus"("restaurant_id");

-- CreateIndex
CREATE UNIQUE INDEX "_EntriesToMenus_AB_unique" ON "_EntriesToMenus"("A", "B");

-- CreateIndex
CREATE INDEX "_EntriesToMenus_B_index" ON "_EntriesToMenus"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EntriesToIngredients_AB_unique" ON "_EntriesToIngredients"("A", "B");

-- CreateIndex
CREATE INDEX "_EntriesToIngredients_B_index" ON "_EntriesToIngredients"("B");

-- AddForeignKey
ALTER TABLE "Restaurants" ADD CONSTRAINT "Restaurants_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventories" ADD CONSTRAINT "Inventories_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menus" ADD CONSTRAINT "Menus_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntriesToMenus" ADD CONSTRAINT "_EntriesToMenus_A_fkey" FOREIGN KEY ("A") REFERENCES "Entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntriesToMenus" ADD CONSTRAINT "_EntriesToMenus_B_fkey" FOREIGN KEY ("B") REFERENCES "Menus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntriesToIngredients" ADD CONSTRAINT "_EntriesToIngredients_A_fkey" FOREIGN KEY ("A") REFERENCES "Entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntriesToIngredients" ADD CONSTRAINT "_EntriesToIngredients_B_fkey" FOREIGN KEY ("B") REFERENCES "Ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
