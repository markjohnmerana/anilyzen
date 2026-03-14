--Using PostgreSQL in Supabase

create table sensor_readings (
  id          bigserial primary key,
  device_id   text not null,
  timestamp   timestamptz not null,
  temperature numeric(5,2),
  ph          numeric(4,2),
  oxygen      numeric(4,2),
  turbidity   numeric(5,2),
  water_level numeric(5,2),
  created_at  timestamptz default now()
);

create table alerts (
  id         bigserial primary key,
  device_id  text not null,
  sensor     text not null,
  message    text not null,
  value      numeric(6,2),
  timestamp  timestamptz not null,
  created_at timestamptz default now()
);

-- Testing the schema

insert into sensor_readings
  (device_id, timestamp, temperature, ph, oxygen, turbidity, water_level)
values
  ('pond-sensor-001', now(), 27.43, 7.21, 6.84, 4.12, 45.67);

select * 
from sensor_readings;