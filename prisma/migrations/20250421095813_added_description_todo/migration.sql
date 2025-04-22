/*
  Warnings:

  - A unique constraint covering the columns `[todo]` on the table `Todo` will be added. If there are existing duplicate values, this will fail.
  - Made the column `todo` on table `Todo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "description" TEXT,
ALTER COLUMN "todo" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Todo_todo_key" ON "Todo"("todo");
