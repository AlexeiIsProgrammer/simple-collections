CREATE DATABASE collections;

CREATE TYPE roleType AS ENUM ('admin', 'user');
CREATE TYPE statusType AS ENUM ('blocked', 'active');

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  password VARCHAR(255),
  email VARCHAR(255),
  role roleType,
  status statusType
);