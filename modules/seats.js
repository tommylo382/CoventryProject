// chose live db or test db

const url = new URL(import.meta.url);
let path;
if (url.searchParams.get("db") === "test") {
  path = "./db.js?db=test";
} else {
  path = "./db.js";
}

// internal import

const { showSeats, updateSeat } = await import(
  path
);

// show seats

export async function showSeat(id, user) {
  const record = await showSeats(id);
  record.show_time = JSON.stringify(record.show_time);
  record.show_time = record.show_time.replace("T", " ").substring(1).split(".")[0]
  for (const seat in record.a_row) {
    record.a_row[seat] = {name: record.a_row[seat]};
    if (record.a_row[seat].name === user) {
      record.a_row[seat].own = true;
    }
  }
  for (const seat in record.b_row) {
    record.b_row[seat] = {name: record.b_row[seat]};
    if (record.b_row[seat].name === user) {
      record.b_row[seat].own = true;
    }
  }
  for (const seat in record.c_row) {
    record.c_row[seat] = {name: record.c_row[seat]};
    if (record.c_row[seat].name === user) {
      record.c_row[seat].own = true;
    }
  }
  return record;
}

// book seat

export async function bookSeat(data) {
  const id = data.id;
  delete data.id;
  delete data.movieId;
  if (Object.keys(data).length === 0) {
    return "no changes were made"
  } else {
    let seats = "";
    let message = "";
    for (const seat in data) {
      if (data[seat] === "owned") {
        seats += ` ${seat}=NULL,`;
        message += ` ${seat}`;
      } else {
        seats += ` ${seat}="${data[seat]}",`;
        message += ` ${seat}`;
      }
    }
    seats = seats.substring(0, seats.length - 1);
    await updateSeat(id, seats);
    return `edited seats${message} state for show id ${id}`;
  }
}
