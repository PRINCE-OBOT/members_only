const pool = require("./pool");

async function addUser(user) {
  const { firstName, lastName, email, hashedPassword, isAdmin } = user;
  await pool.query(
    "INSERT INTO users (firstName, lastName, email, password, isMember, isAdmin) VALUES ($1, $2, $3, $4, $5, $6)",
    [firstName, lastName, email, hashedPassword, false, isAdmin]
  );
}

async function addMessage(message) {
  const { title, text, userId } = message;
  console.log(title, text, userId)
  await pool.query(
    "INSERT INTO messages (title, text, createdAt, userId) VALUES ($1, $2, NOW(), $3)",
    [title, text, userId]
  );
}

module.exports = { addUser, addMessage };
