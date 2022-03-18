// chose live db or test db

const url = new URL(import.meta.url);
let path;
if (url.searchParams.get("db") === "test") {
  path = "./db.js?db=test";
} else {
  path = "./db.js";
}

// internal import

const { showFilm, showCinema } = await import(
  path
);

// show all movies

export async function showMovie() {
  const records = await showFilm();
  for (const record of records) {
    record.cinemas = await showCinema(record.id)
  }
  return records;
}
