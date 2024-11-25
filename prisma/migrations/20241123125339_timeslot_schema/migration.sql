/*
  Warnings:

  - You are about to drop the column `end` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `Booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[spaceId,date,timeSlotId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeSlotId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "end",
DROP COLUMN "start",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "timeSlotId" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "TimeSlot" (
    "id" SERIAL NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,

    CONSTRAINT "TimeSlot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TimeSlot_startTime_endTime_key" ON "TimeSlot"("startTime", "endTime");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_spaceId_date_timeSlotId_key" ON "Booking"("spaceId", "date", "timeSlotId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
