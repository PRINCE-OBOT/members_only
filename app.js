const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const session = require("express-session");
const router = require("./routes/index"); 
const pool = require("./db/pool");
const pgSession = require("connect-pg-simple")(session);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  session({
    store: new pgSession({
      pool: pool,
      createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      const user = rows[0];

      if (!user) return done(null, false, { message: "Incorrect username" }); // User not found — deny access

      const match = await bcrypt.compare(password, user.password);
      if (!match) return done(null, false, { message: "Incorrect password" }); // Wrong password — deny access

      return done(null, user); // Attaches the user object to req.user
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
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
});

app.use("/user", router);

app.post(
  "/log-in",
  passport.authenticate("local", { session: true }),
  (req, res) => {
    res.json({ message: "Logged in successfully" });
  }
);

app.get("/dashboard", (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.json({ user: req.user.username });
});

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log("App listening on port 3000!");
});
