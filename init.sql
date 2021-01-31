CREATE TABLE managers (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  hash VARCHAR(128) NOT NULL,
  salt VARCHAR(32) NOT NULL
);

INSERT INTO managers (name, hash, salt)
 VALUES ('J.K. Rowling', 'hash', 'salt'), ('Jon Conor', 'hash', 'salt');