/*
  Warnings:

  - Changed the type of `user_id` on the `Todo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "user_id" DROP DEFAULT;

-- 2. Change the column type from text/varchar to integer, casting existing values
ALTER TABLE "Todo"
  ALTER COLUMN "user_id" TYPE integer
  USING ("user_id")::integer;
