/*
  Warnings:

  - You are about to drop the column `description` on the `Goal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "description",
ALTER COLUMN "current_date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MiniTask" ALTER COLUMN "is_done" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "is_done" SET DEFAULT false;
