-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELED');

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "status" "ReservationStatus" NOT NULL DEFAULT 'SCHEDULED';
