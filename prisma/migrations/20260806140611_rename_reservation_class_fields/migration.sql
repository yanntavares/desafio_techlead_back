/*
  Warnings:

  - You are about to drop the column `classId` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `classroomId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_classId_fkey";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "classId",
ADD COLUMN     "classroomId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
