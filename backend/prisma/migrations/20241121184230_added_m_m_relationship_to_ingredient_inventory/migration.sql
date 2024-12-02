-- CreateTable
CREATE TABLE "_IngredientToInventory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToInventory_AB_unique" ON "_IngredientToInventory"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToInventory_B_index" ON "_IngredientToInventory"("B");

-- AddForeignKey
ALTER TABLE "_IngredientToInventory" ADD CONSTRAINT "_IngredientToInventory_A_fkey" FOREIGN KEY ("A") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToInventory" ADD CONSTRAINT "_IngredientToInventory_B_fkey" FOREIGN KEY ("B") REFERENCES "inventories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
