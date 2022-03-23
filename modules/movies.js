// chose live db or test db

const url = new URL(import.meta.url);
let path;
if (url.searchParams.get("db") === "test") {
  path = "./db.js?db=test";
} else {
  path = "./db.js";
}

// internal import

const { showFilm, showCinema, showOneFilm, showShows, findFilm } = await import(
  path
);

// show all movies

export async function showMovie() {
  const records = await showFilm();
  for (const record of records) {
    record.cinemas = await showCinema(record.id);
  }
  return records;
}

// show detail of a movie

export async function showMovieDetail(id) {
  const record = await showOneFilm(id);
  record.cinemas = await showCinema(id);
  for (const cinema of record.cinemas) {
    const shows = await showShows(id, cinema.name)
    for (const show of shows) {
      show.show_time = JSON.stringify(show.show_time)
      show.show_time = `${show.show_time.split("T")[0].substring(1)} ${show.show_time.split("T")[1].split(".")[0]}`
    }
    cinema.shows = shows
  }
  return record;
}

// search movies

export async function findMovie() {
  const records = await findFilm();
  return records;
}
