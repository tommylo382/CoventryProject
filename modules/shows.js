// chose live db or test db

const url = new URL(import.meta.url);
let path;
if (url.searchParams.get("db") === "test") {
  path = "./db.js?db=test";
} else {
  path = "./db.js";
}

// internal import

const { allCinema, addShow, checkShows, delShows, showAllShows } = await import(
  path
);

// show all cinemas

export async function showAllCinema() {
  const records = await allCinema()
  return records;
}

// add new show

export async function addNewShow(data) {
  data.time = data.time.replace("T", " ")
  await addShow(data)
  return `added new show for ${data.name}`;
}

// show all comments

export async function showAllShow() {
  const records = await showAllShows();
  return records;
}

// delete show

export async function delShow(id) {
  const find = await checkShows(id);
  if (find === false) {
    return `show id ${id} not exists`;
  } else {
    await delShows(id);
    return `delete show id ${id}`;
  }
}
