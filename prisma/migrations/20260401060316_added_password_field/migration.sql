/*
  Warnings:

  - Added the required column `password` to the `MUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MUser" ADD COLUMN     "password" TEXT NOT NULL;
