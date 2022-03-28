// chose live db or test db

const url = new URL(import.meta.url);
let path;
if (url.searchParams.get("db") === "test") {
  path = "./db.js?db=test";
} else {
  path = "./db.js";
}

// internal import

const { showReview, addReview, checkReview, delReview, showAllReview } =
  await import(
    path
  );

// show all comments of a movie

export async function showComment(id) {
  const records = await showReview(id);
  return records;
}

// show all comments

export async function showAllComment() {
  const records = await showAllReview();
  return records;
}

// create new comment

export async function addComment(data) {
  await addReview(data);
  return `${data.name} created a comment`;
}

// delete comment

export async function delComment(id) {
  const find = await checkReview(id);
  if (find === false) {
    return `comment id ${id} not exists`;
  } else {
    await delReview(id);
    return `delete comment id ${id}`;
  }
}
