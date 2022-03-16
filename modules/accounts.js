// chose live db or test db

const url = new URL(import.meta.url);
let path;
if (url.searchParams.get("db") === "test") {
  path = "./db.js?db=test";
} else {
  path = "./db.js";
}

// internal import

const { findUser, verifyPass, addAcc, delAcc, getRole, showAcc } = await import(
  path
);

// login

export async function login(data) {
  const exists = await findUser(data.userName);
  if (exists === false) {
    return `user ${data.userName} not found`;
  }

  const valid = await verifyPass(data);
  if (valid === false) {
    return `worng password for ${data.userName}`;
  }
  return data.userName;
}

// register

export async function register(data) {
  const find = await findUser(data.userName);
  if (find === true) {
    return `username ${data.userName} already exists`;
  } else {
    await addAcc(data);
    return `create account ${data.userName}`;
  }
}

// delete account

export async function del(user) {
  const find = await findUser(user);
  if (find === false) {
    return `username ${user} not exists`;
  } else {
    await delAcc(user);
    return `delete account ${user}`;
  }
}

// get role

export async function role(user) {
  const record = await getRole(user);
  return record;
}

// show all users

export async function showUser() {
  const records = await showAcc();
  return records;
}
