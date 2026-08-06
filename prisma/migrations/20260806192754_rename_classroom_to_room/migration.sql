/*
  Warnings:

  - You are about to drop the column `classroomId` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the `Classroom` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `roomId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_classroomId_fkey";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "classroomId",
ADD COLUMN     "roomId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Classroom";

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "description" TEXT,
    "status" "ClassStatus" NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_name_key" ON "Room"("name");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
