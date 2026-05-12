const pool = require("./pool");

async function addUser(user) {
  const { firstName, lastName, email, hashedPassword } = user;

  await pool.query(
    "INSERT INTO users (firstName, lastName, email, password, isMember, isAdmin) VALUES ($1, $2, $3, $4, $5, $6)",
    [firstName, lastName, email, hashedPassword, false, false]
  );
}

async function updateUser(user) {
  const { id, email, isMember, isAdmin } = user;

  await pool.query(
    "UPDATE users SET isAdmin = $4, isMember = $3 WHERE id = $1 AND email = $2",
    [id, email, isMember || false, isAdmin || false]
  );
}

async function addMessage(message) {
  const { title, text, userId } = message;

  await pool.query(
    "INSERT INTO messages (title, text, createdAt, userId) VALUES ($1, $2, NOW(), $3)",
    [title, text, userId]
  );
}

async function deleteMessage(id) {
  await pool.query("DELETE FROM messages WHERE id = $1", [id]);
}

async function isPasscodeValid({ name, passcode }) {
  const { rows } = await pool.query(
    "SELECT * FROM passcodes WHERE name = $1 AND passcode = $2",
    [name, passcode]
  );
  return rows[0];
}

module.exports = {
  addUser,
  updateUser,
  addMessage,
  deleteMessage,
  isPasscodeValid
};
