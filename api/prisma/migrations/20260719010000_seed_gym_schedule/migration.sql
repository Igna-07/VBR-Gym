INSERT INTO "ScheduleGroup" ("id", "name", "startTime", "endTime", "capacity", "updatedAt")
SELECT gen_random_uuid()::text, schedule.name, schedule.start_time, schedule.end_time, 15, CURRENT_TIMESTAMP
FROM (VALUES
  ('Turno mañana', '08:00', '09:00'),
  ('Turno mañana', '09:00', '10:00'),
  ('Turno mañana', '10:00', '11:00'),
  ('Turno tarde', '17:00', '18:00'),
  ('Turno tarde', '18:00', '19:00'),
  ('Turno tarde', '19:00', '20:00'),
  ('Turno tarde', '20:00', '21:00')
) AS schedule(name, start_time, end_time)
WHERE NOT EXISTS (
  SELECT 1 FROM "ScheduleGroup"
  WHERE "startTime" = schedule.start_time AND "endTime" = schedule.end_time
);
