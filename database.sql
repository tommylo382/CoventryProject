-- create user account

CREATE USER IF NOT EXISTS dbuser IDENTIFIED BY 'dbpassword';
GRANT INSERT, SELECT, UPDATE, DELETE ON 300COM.* TO dbuser;
GRANT INSERT, SELECT, UPDATE, DELETE ON test.* TO dbuser;

-- live website db

CREATE DATABASE IF NOT EXISTS 300COM;
USE 300COM;

-- tables

DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS accounts;

CREATE TABLE IF NOT EXISTS accounts (
    user_name VARCHAR(30) NOT NULL PRIMARY KEY,
    password VARCHAR(30) NOT NULL,
    role VARCHAR(1)
);

CREATE TABLE IF NOT EXISTS movies (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    thumbnail TEXT,
    description VARCHAR(3000) NOT NULL
);

-- init records

INSERT INTO accounts (user_name, password, role) VALUES ('host', 'password', 'h');
INSERT INTO accounts (user_name, password, role) VALUES ('admin1', 'password', 'a');
INSERT INTO accounts (user_name, password, role) VALUES ('staff1', 'password', 's');
INSERT INTO accounts (user_name, password) VALUES ('user1', 'password');

INSERT INTO movies (name, description) VALUES ('test1', 'sample record');
INSERT INTO movies (name, description) VALUES ('test2', 'sample record');
INSERT INTO movies (name, description) VALUES ('test3', 'sample record');

-- testing db

CREATE DATABASE IF NOT EXISTS test;
USE test;

-- tables

DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS accounts;

CREATE TABLE IF NOT EXISTS accounts (
    user_name VARCHAR(30) NOT NULL PRIMARY KEY,
    password VARCHAR(30) NOT NULL,
    role VARCHAR(1)
);

CREATE TABLE IF NOT EXISTS movies (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    thumbnail TEXT,
    description VARCHAR(3000) NOT NULL
);

-- init records

INSERT INTO accounts (user_name, password, role) VALUES ('host', 'password', 'h');
INSERT INTO accounts (user_name, password, role) VALUES ('admin1', 'password', 'a');
INSERT INTO accounts (user_name, password, role) VALUES ('staff1', 'password', 's');
INSERT INTO accounts (user_name, password) VALUES ('user1', 'password');

INSERT INTO movies (name, description) VALUES ('test1', 'sample record');
INSERT INTO movies (name, description) VALUES ('test2', 'sample record');
INSERT INTO movies (name, description) VALUES ('test3', 'sample record');
