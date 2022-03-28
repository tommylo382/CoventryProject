// external import

import { Client } from "https://deno.land/x/mysql/mod.ts";

// chose live db or test db

const url = new URL(import.meta.url);
let database;
if (url.searchParams.get("db") === "test") {
  database = "test";
} else {
  database = "300COM";
}

// connect to db

const connData = {
  "/home/codio": {
    hostname: "127.0.0.1",
    username: "dbuser",
    password: "dbpassword",
    db: database,
  },
  "/app": {
    hostname: "db.bit.io",
    username: "tommylo384_demo_db_connection",
    password: "36TS5_jfwPuZ4gX8xP87RwAFML8iz",
    db: "bitdotio",
  },
};
const home = Deno.env.get("HOME");
const conn = connData[home];

// search user

export async function findUser(user) {
  const db = await new Client().connect(conn);
  const sql =
    `SELECT COUNT(user_name) AS count FROM accounts WHERE user_name="${user}";`;
  const records = await db.query(sql);
  db.close();
  if (records[0].count) {
    return true;
  } else {
    return false;
  }
}

// verify password

export async function verifyPass(data) {
  const db = await new Client().connect(conn);
  const sql =
    `SELECT password FROM accounts WHERE user_name="${data.userName}";`;
  const records = await db.query(sql);
  db.close();
  if (records[0].password === data.password) {
    return true;
  } else {
    return false;
  }
}

// create new account

export async function addAcc(data) {
  const db = await new Client().connect(conn);
  let sql;
  if (!data.role) {
    sql =
      `INSERT INTO accounts(user_name, password) VALUES("${data.userName}", "${data.password}");`;
  } else {
    sql =
      `INSERT INTO accounts(user_name, password, role) VALUES("${data.userName}", "${data.password}", "${data.role}");`;
  }
  await db.query(sql);
  db.close();
}

// delete account

export async function delAcc(user) {
  const db = await new Client().connect(conn);
  const sql = `DELETE FROM accounts WHERE user_name="${user}"`;
  await db.query(sql);
  db.close();
}

// get role

export async function getRole(user) {
  const db = await new Client().connect(conn);
  const sql = `SELECT role FROM accounts WHERE user_name="${user}";`;
  const records = await db.query(sql);
  db.close();
  return records[0].role;
}

// show all accounts

export async function showAcc() {
  const db = await new Client().connect(conn);
  const sql = "SELECT user_name, role FROM accounts;";
  const records = await db.query(sql);
  db.close();
  return records;
}

// show all movies

export async function showFilm() {
  const db = await new Client().connect(conn);
  const sql = "SELECT id, name, thumbnail FROM movies ORDER BY id DESC;";
  const records = await db.query(sql);
  db.close();
  return records;
}

// show all cinemas of a movie

export async function showCinema(movieId) {
  const db = await new Client().connect(conn);
  const sql =
    `SELECT DISTINCT cinemas.name FROM ((shows INNER JOIN cinemas ON cinema_id=cinemas.id) INNER JOIN movies ON movie_id=movies.id) WHERE movies.id="${movieId}";`;
  const records = await db.query(sql);
  db.close();
  return records;
}

// show one movie

export async function showOneFilm(id) {
  const db = await new Client().connect(conn);
  const sql =
    `SELECT id, name, thumbnail, description FROM movies WHERE id="${id}";`;
  const records = await db.query(sql);
  db.close();
  return records[0];
}

// show all shows of a movie

export async function showShows(movieId, cinemaName) {
  const db = await new Client().connect(conn);
  const sql =
    `SELECT shows.id, show_time FROM ((shows INNER JOIN cinemas ON cinema_id=cinemas.id) INNER JOIN movies ON movie_id=movies.id) WHERE movies.id="${movieId}" AND cinemas.name="${cinemaName}";`;
  const records = await db.query(sql);
  db.close();
  return records;
}

// search movies

export async function findFilm(type, keyword) {
  const db = await new Client().connect(conn);
  let sql;
  if (type === "name") {
    sql =
      `SELECT id, name, thumbnail FROM movies WHERE name LIKE "%${keyword}%";`;
  } else {
    sql =
      `SELECT DISTINCT movies.id, movies.name, movies.thumbnail FROM ((shows INNER JOIN cinemas ON cinema_id=cinemas.id) INNER JOIN movies ON movie_id=movies.id) WHERE cinemas.name LIKE "%${keyword}%";`;
  }
  const records = await db.query(sql);
  db.close();
  return records;
}

// edit movie detail

export async function editDetail(data, image) {
  const db = await new Client().connect(conn);
  let sql;
  if (image === undefined) {
    sql =
      `UPDATE movies SET name="${data.name}", description="${data.description}" WHERE id="${data.id}";`;
  } else {
    sql =
      `UPDATE movies SET name="${data.name}", description="${data.description}", thumbnail="${image}" WHERE id="${data.id}";`;
  }
  await db.query(sql);
  db.close();
}

// create new movie

export async function addFilm(data, image) {
  const db = await new Client().connect(conn);
  const sql =
    `INSERT INTO movies(name, description, thumbnail) VALUES("${data.name}", "${data.description}", "${image}");`;
  await db.query(sql);
  db.close();
}

// check if a movie exists

export async function checkFilm(id) {
  const db = await new Client().connect(conn);
  const sql = `SELECT COUNT(id) AS count FROM movies WHERE id="${id}";`;
  const records = await db.query(sql);
  db.close();
  if (records[0].count) {
    return true;
  } else {
    return false;
  }
}

// delete movie

export async function delFilm(id) {
  const db = await new Client().connect(conn);
  let sql = `DELETE FROM seats WHERE movie_id="${id}"`;
  await db.query(sql);

  sql = `DELETE FROM shows WHERE movie_id="${id}"`;
  await db.query(sql);

  sql = `DELETE FROM comments WHERE movie_id="${id}"`;
  await db.query(sql);

  sql = `DELETE FROM movies WHERE id="${id}"`;
  await db.query(sql);
  db.close();
}

// show all comments of a movie

export async function showReview(id) {
  const db = await new Client().connect(conn);
  const sql =
    `SELECT id, name, rating, review FROM comments WHERE movie_id="${id}" ORDER BY id;`;
  const records = await db.query(sql);
  db.close();
  return records;
}

// show all comments

export async function showAllReview() {
  const db = await new Client().connect(conn);
  const sql = `SELECT id, name, rating, review FROM comments ORDER BY id;`;
  const records = await db.query(sql);
  db.close();
  return records;
}

// create new comment

export async function addReview(data) {
  const db = await new Client().connect(conn);
  const sql =
    `INSERT INTO comments(movie_id, name, rating, review) VALUES("${data.movieId}", "${data.name}", "${data.rating}", "${data.review}");`;
  await db.query(sql);
  db.close();
}

// check if a comment exists

export async function checkReview(id) {
  const db = await new Client().connect(conn);
  const sql = `SELECT COUNT(id) AS count FROM comments WHERE id="${id}";`;
  const records = await db.query(sql);
  db.close();
  if (records[0].count) {
    return true;
  } else {
    return false;
  }
}

// delete comment

export async function delReview(id) {
  const db = await new Client().connect(conn);
  const sql = `DELETE FROM comments WHERE id="${id}"`;
  await db.query(sql);
  db.close();
}

// show the ratings of a movie

export async function showRating(id) {
  const db = await new Client().connect(conn);
  const sql =
    `SELECT AVG(rating) AS ratings FROM comments WHERE movie_id="${id}"`;
  const records = await db.query(sql);
  db.close();
  return records[0].ratings;
}

// create new show

export async function addShow(data) {
  const db = await new Client().connect(conn);
  let sql =
    `INSERT INTO shows(show_time, movie_id, cinema_id) VALUES("${data.time}", "${data.id}", "${data.cinema}");`;
  await db.query(sql);

  const records = await showAllShows()
  const id = records.pop().id

  sql = `INSERT INTO seats(show_id, movie_id) VALUES("${id}", "${data.id}");`;
  await db.query(sql);
  db.close();
}

// show all cinemas

export async function allCinema() {
  const db = await new Client().connect(conn);
  const sql = "SELECT id, name FROM cinemas;";
  const records = await db.query(sql);
  db.close();
  return records;
}

// check if a show exists

export async function checkShows(id) {
  const db = await new Client().connect(conn);
  const sql = `SELECT COUNT(id) AS count FROM shows WHERE id="${id}";`;
  const records = await db.query(sql);
  db.close();
  if (records[0].count) {
    return true;
  } else {
    return false;
  }
}

// show all shows

export async function showAllShows() {
  const db = await new Client().connect(conn);
  const sql = `SELECT id FROM shows ORDER BY id;`;
  const records = await db.query(sql);
  db.close();
  return records;
}

// delete show

export async function delShows(id) {
  const db = await new Client().connect(conn);
  let sql = `DELETE FROM seats WHERE show_id="${id}"`;
  await db.query(sql);

  sql = `DELETE FROM shows WHERE id="${id}"`;
  await db.query(sql);
  db.close();
}

// show seats

export async function showSeats(id) {
  const db = await new Client().connect(conn);

  let sql = `SELECT shows.show_time, movies.name FROM shows INNER JOIN movies ON shows.movie_id=movies.id WHERE shows.id="${id}";`;
  let records = await db.query(sql);
  const record = records[0];

  sql = `SELECT a1, a2, a3, a4, a5 FROM seats WHERE show_id="${id}";`;
  records = await db.query(sql);
  record.a_row = records[0];

  sql = `SELECT b1, b2, b3, b4, b5 FROM seats WHERE show_id="${id}";`;
  records = await db.query(sql);
  record.b_row = records[0];

  sql = `SELECT c1, c2, c3, c4, c5 FROM seats WHERE show_id="${id}";`;
  records = await db.query(sql);
  record.c_row = records[0];

  db.close();
  return record;
}

// book seat

export async function updateSeat(id, seats) {
  const db = await new Client().connect(conn);
  const sql = `UPDATE seats SET${seats} WHERE show_id="${id}";`;
  await db.query(sql);
  db.close();
}
