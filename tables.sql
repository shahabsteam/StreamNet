DROP TABLE IF EXISTS streams;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL unique,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE streams (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  streamkey VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  FOREIGN KEY (username) REFERENCES users (username)
);
