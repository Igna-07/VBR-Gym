CREATE TYPE "AttendanceFrequency" AS ENUM ('TWO_DAYS', 'THREE_DAYS', 'DAILY');

CREATE TABLE "ScheduleGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 15,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ScheduleGroup_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Member"
ADD COLUMN "attendanceFrequency" "AttendanceFrequency" NOT NULL DEFAULT 'THREE_DAYS',
ADD COLUMN "attendanceDays" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "scheduleGroupId" TEXT;

ALTER TABLE "Member" ADD CONSTRAINT "Member_scheduleGroupId_fkey"
FOREIGN KEY ("scheduleGroupId") REFERENCES "ScheduleGroup"("id")
ON DELETE SET NULL ON UPDATE CASCADE;
