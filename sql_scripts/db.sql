CREATE DATABASE sam_storage;
\c sam_storage
CREATE TABLE users(
  email varchar(30) NOT NULL,
  budget REAL NOT NULL
);

INSERT INTO users(email, budget) VALUES
('user@user.com', 15),
('marco@proietti.com', 100);
