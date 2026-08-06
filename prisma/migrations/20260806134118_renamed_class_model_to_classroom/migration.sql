/*
  Warnings:

  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `endDateTune` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDateTime` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_classId_fkey";

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "endDateTune" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDateTime" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Class";

-- CreateTable
CREATE TABLE "Classroom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "description" TEXT,
    "status" "ClassStatus" NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
