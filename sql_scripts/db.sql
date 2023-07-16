CREATE DATABASE prav;
\c prav
CREATE TABLE users(
  email varchar(50) NOT NULL,
  budget REAL NOT NULL
);

INSERT INTO users(email, budget) VALUES
('user@user.com', 15),
('marco@proietti.com', 100);