-- create user account

CREATE USER IF NOT EXISTS dbuser IDENTIFIED BY 'dbpassword';
GRANT INSERT, SELECT, UPDATE, DELETE ON 300COM.* TO dbuser;
GRANT INSERT, SELECT, UPDATE, DELETE ON test.* TO dbuser;

-- live website db

CREATE DATABASE IF NOT EXISTS 300COM;
USE 300COM;

-- tables

DROP TABLE IF EXISTS seats;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS shows;
DROP TABLE IF EXISTS cinemas;
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

CREATE TABLE IF NOT EXISTS cinemas (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS shows (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    show_time DATETIME NOT NULL,
    movie_id  INT UNSIGNED NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    cinema_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (cinema_id) REFERENCES cinemas(id)
);

CREATE TABLE IF NOT EXISTS comments (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    movie_id  INT UNSIGNED NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    name VARCHAR(50) NOT NULL,
    rating  TINYINT UNSIGNED NOT NULL,
    review VARCHAR(3000) NOT NULL
);

CREATE TABLE IF NOT EXISTS seats (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    show_id  INT UNSIGNED NOT NULL,
    FOREIGN KEY (show_id) REFERENCES shows(id),
    movie_id  INT UNSIGNED NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    a1 VARCHAR(50),
    a2 VARCHAR(50),
    a3 VARCHAR(50),
    a4 VARCHAR(50),
    a5 VARCHAR(50),
    b1 VARCHAR(50),
    b2 VARCHAR(50),
    b3 VARCHAR(50),
    b4 VARCHAR(50),
    b5 VARCHAR(50),
    c1 VARCHAR(50),
    c2 VARCHAR(50),
    c3 VARCHAR(50),
    c4 VARCHAR(50),
    c5 VARCHAR(50)
);

-- init records

INSERT INTO accounts (user_name, password, role) VALUES ('host', 'password', 'h');
INSERT INTO accounts (user_name, password, role) VALUES ('admin1', 'password', 'a');
INSERT INTO accounts (user_name, password, role) VALUES ('staff1', 'password', 's');
INSERT INTO accounts (user_name, password) VALUES ('user1', 'password');

INSERT INTO movies (name, description, thumbnail) VALUES ('test1', 'sample record', "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAEgAgAMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP7+KACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA/wD/2Q==");
INSERT INTO movies (name, description, thumbnail) VALUES ('test2', 'sample record', "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAEgAgAMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP7+KACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA/wD/2Q==");
INSERT INTO movies (name, description, thumbnail) VALUES ('test3', 'sample record', "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAEgAgAMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP7+KACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA/wD/2Q==");

INSERT INTO cinemas (name) VALUES ('cinema1');
INSERT INTO cinemas (name) VALUES ('cinema2');
INSERT INTO cinemas (name) VALUES ('cinema3');

INSERT INTO shows (show_time, movie_id, cinema_id) VALUES ('2022-03-18 11:00:00', '1', '1');
INSERT INTO shows (show_time, movie_id, cinema_id) VALUES ('2022-03-18 11:30:00', '1', '2');
INSERT INTO shows (show_time, movie_id, cinema_id) VALUES ('2022-03-18 12:00:00', '2', '3');

INSERT INTO comments (movie_id, name, rating, review) VALUES ('1', 'user1', '3', 'sample record');
INSERT INTO comments (movie_id, name, rating, review) VALUES ('1', 'staff1', '5', 'sample record');
INSERT INTO comments (movie_id, name, rating, review) VALUES ('2', 'user1', '3', 'sample record');

INSERT INTO seats (show_id, movie_id, a1, b2, c3) VALUES ('1', '1', 'host', 'admin1', 'staff1');
INSERT INTO seats (show_id, movie_id, a1, b2, c3) VALUES ('2', '1', 'host', 'admin1', 'staff1');
INSERT INTO seats (show_id, movie_id, a1, b2, c3) VALUES ('3', '2', 'host', 'admin1', 'staff1');

-- testing db

CREATE DATABASE IF NOT EXISTS test;
USE test;

-- tables

DROP TABLE IF EXISTS seats;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS shows;
DROP TABLE IF EXISTS cinemas;
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

CREATE TABLE IF NOT EXISTS cinemas (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS shows (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    show_time DATETIME NOT NULL,
    movie_id  INT UNSIGNED NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    cinema_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (cinema_id) REFERENCES cinemas(id)
);

CREATE TABLE IF NOT EXISTS comments (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    movie_id  INT UNSIGNED NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    name VARCHAR(50) NOT NULL,
    rating  TINYINT UNSIGNED NOT NULL,
    review VARCHAR(3000) NOT NULL
);

CREATE TABLE IF NOT EXISTS seats (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    show_id  INT UNSIGNED NOT NULL,
    FOREIGN KEY (show_id) REFERENCES shows(id),
    movie_id  INT UNSIGNED NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    a1 VARCHAR(50),
    a2 VARCHAR(50),
    a3 VARCHAR(50),
    a4 VARCHAR(50),
    a5 VARCHAR(50),
    b1 VARCHAR(50),
    b2 VARCHAR(50),
    b3 VARCHAR(50),
    b4 VARCHAR(50),
    b5 VARCHAR(50),
    c1 VARCHAR(50),
    c2 VARCHAR(50),
    c3 VARCHAR(50),
    c4 VARCHAR(50),
    c5 VARCHAR(50)
);

-- init records

INSERT INTO accounts (user_name, password, role) VALUES ('host', 'password', 'h');
INSERT INTO accounts (user_name, password, role) VALUES ('admin1', 'password', 'a');
INSERT INTO accounts (user_name, password, role) VALUES ('staff1', 'password', 's');
INSERT INTO accounts (user_name, password) VALUES ('user1', 'password');

INSERT INTO movies (name, description, thumbnail) VALUES ('test1', 'sample record', "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAEgAgAMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP7+KACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA/wD/2Q==");
INSERT INTO movies (name, description) VALUES ('test2', 'sample record');
INSERT INTO movies (name, description) VALUES ('test3', 'sample record');

INSERT INTO cinemas (name) VALUES ('cinema1');
INSERT INTO cinemas (name) VALUES ('cinema2');
INSERT INTO cinemas (name) VALUES ('cinema3');

INSERT INTO shows (show_time, movie_id, cinema_id) VALUES ('2022-03-18 11:00:00', '1', '1');
INSERT INTO shows (show_time, movie_id, cinema_id) VALUES ('2022-03-18 11:30:00', '1', '2');
INSERT INTO shows (show_time, movie_id, cinema_id) VALUES ('2022-03-18 12:00:00', '2', '3');

INSERT INTO comments (movie_id, name, rating, review) VALUES ('1', 'user1', '3', 'sample record');
INSERT INTO comments (movie_id, name, rating, review) VALUES ('1', 'staff1', '5', 'sample record');
INSERT INTO comments (movie_id, name, rating, review) VALUES ('2', 'user1', '3', 'sample record');

INSERT INTO seats (show_id, movie_id, a1, b2, c3) VALUES ('1', '1', 'host', 'admin1', 'staff1');
INSERT INTO seats (show_id, movie_id, a1, b2, c3) VALUES ('2', '1', 'host', 'admin1', 'staff1');
INSERT INTO seats (show_id, movie_id, a1, b2, c3) VALUES ('3', '2', 'host', 'admin1', 'staff1');