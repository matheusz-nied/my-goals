/*
  Warnings:

  - Added the required column `toDo` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "toDo" TEXT NOT NULL;
