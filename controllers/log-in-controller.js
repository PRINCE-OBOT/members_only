const bcrypt = require("bcryptjs");
const pool = require("../db/pool");
const LocalStrategy = require("passport-local").Strategy;

const localStrategy = () => {
  return new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const { rows } = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [email]
        );
        const user = rows[0];

        if (!user) return done(null, false, { message: "Incorrect email" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return done(null, false, { message: "Incorrect password" });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  );
};

const serializeUser = (user, done) => {
  done(null, user.id);
};

const deserializeUser = async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id
    ]);
    const user = rows[0];

    if (!user) return done(null, false);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

module.exports = {
  localStrategy,
  serializeUser,
  deserializeUser
};
