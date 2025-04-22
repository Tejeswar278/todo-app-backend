/*
  Warnings:

  - A unique constraint covering the columns `[user_id,todo]` on the table `Todo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Todo_todo_key";

-- CreateIndex
CREATE UNIQUE INDEX "Todo_user_id_todo_key" ON "Todo"("user_id", "todo");
