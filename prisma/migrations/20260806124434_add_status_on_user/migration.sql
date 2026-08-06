/*
  Warnings:

  - The `status` column on the `Class` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "ClassStatus" AS ENUM ('RESERVED', 'AVAILABLE');

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "status",
ADD COLUMN     "status" "ClassStatus" NOT NULL DEFAULT 'AVAILABLE';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';

-- DropEnum
DROP TYPE "STATUS";
