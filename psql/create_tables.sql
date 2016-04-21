DROP DATABASE IF EXISTS articles_and_products;
CREATE DATABASE articles_and_products;

\c articles_and_products;

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS articles;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name varchar(150) NOT NULL,
  price money NOT NULL,
  inventory integer NOT NULL
  );

CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title varchar(150) NOT NULL,
  body varchar(255) NOT NULL,
  author varchar(150) NOT NULL
  );