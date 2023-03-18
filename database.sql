CREATE DATABASE dartdb;

CREATE TABLE customers (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255),
    rib varchar(24),
    password VARCHAR(255)
);