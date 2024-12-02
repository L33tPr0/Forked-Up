/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

ALTER SEQUENCE "restaurants_id_seq" MINVALUE 1 START 1 RESTART 1;
ALTER SEQUENCE "inventories_id_seq" MINVALUE 1 START 1 RESTART 1;
ALTER SEQUENCE "menus_id_seq" MINVALUE 1 START 1 RESTART 1;
ALTER SEQUENCE "ingredients_id_seq" MINVALUE 1 START 1 RESTART 1;
ALTER SEQUENCE "entries_id_seq" MINVALUE 1 START 1 RESTART 1;
