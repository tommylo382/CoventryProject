// chose live db or test db

const url = new URL(import.meta.url);
let path;
if (url.searchParams.get("db") === "test") {
  path = "./db.js?db=test";
} else {
  path = "./db.js";
}

// external import

import { resize } from "https://deno.land/x/deno_image@v0.0.3/mod.ts";
import { Base64 } from "https://deno.land/x/bb64@1.1.0/mod.ts";

// internal import

const {
  showFilm,
  showCinema,
  showOneFilm,
  showShows,
  findFilm,
  editDetail,
  addFilm,
  checkFilm,
  delFilm,
  showRating,
} = await import(
  path
);

// show all movies

export async function showMovie() {
  const records = await showFilm();
  for (const record of records) {
    record.rating = await showRating(record.id);
    record.rating = Math.round(record.rating * 10) / 10;
    record.cinemas = await showCinema(record.id);
  }
  return records;
}

// show detail of a movie

export async function showMovieDetail(id) {
  const record = await showOneFilm(id);
  record.rating = await showRating(id);
  record.rating = Math.round(record.rating * 10) / 10;
  record.cinemas = await showCinema(id);
  for (const cinema of record.cinemas) {
    const shows = await showShows(id, cinema.name);
    for (const show of shows) {
      show.show_time = JSON.stringify(show.show_time);
      show.show_time =
      show.show_time.replace("T", " ").substring(1).split(".")[0];
    }
    cinema.shows = shows;
  }
  return record;
}

// search movies

export async function findMovie(type, keyword) {
  const records = await findFilm(type, keyword);
  for (const record of records) {
    record.rating = await showRating(record.id);
    record.rating = Math.round(record.rating * 10) / 10;
    record.cinemas = await showCinema(record.id);
  }
  return records;
}

// edit movie detail

export async function editMovie(data) {
  const file = data.files[0];
  data = data.fields;
  if (file.originalName === "") {
    await editDetail(data);
  } else {
    const size = {
      width: 128,
      height: 72,
    };
    const image = await resize(Deno.readFileSync(file.filename), size);
    const imageURL = `data:image/jpeg;base64,${Base64.fromUint8Array(image)}`;
    await editDetail(data, imageURL);
  }
  return `edited movie id ${data.id}'s detail`;
}

// create new movie

export async function addMovie(data) {
  const file = data.files[0];
  data = data.fields;
  const size = {
    width: 128,
    height: 72,
  };
  const image = await resize(Deno.readFileSync(file.filename), size);
  const imageURL = `data:image/jpeg;base64,${Base64.fromUint8Array(image)}`;
  await addFilm(data, imageURL);
  return `create movie ${data.name}`;
}

// delete movie

export async function delMovie(id) {
  const find = await checkFilm(id);
  if (find === false) {
    return `movie id ${id} not exists`;
  } else {
    await delFilm(id);
    return `delete movie id ${id}`;
  }
}
