const pool = require("./pool");

async function addUser(user) {
  const { firstName, lastName, email, hashedPassword, isAdmin } = user;
  await pool.query(
    "INSERT INTO users (firstName, lastName, email, password, isMember, isAdmin) VALUES ($1, $2, $3, $4, $5, $6)",
    [firstName, lastName, email, hashedPassword, false, isAdmin]
  );
}

async function addMessage(messageObj) {
  const { message, id } = messageObj;
  await pool.query(
    "INSERT INTO users (firstName, lastName, email, password, isMember, isAdmin) VALUES ($1, $2, $3, $4, $5, $6)",
    [firstName, lastName, email, hashedPassword, false, isAdmin]
  );
}

module.exports = { addUser };
