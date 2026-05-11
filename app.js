const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const router = require("./routes/index");
const pool = require("./db/pool");
const loginController = require("./controllers/log-in-controller");
const isAuthenticatedController = require("./controllers/is-authenticated-controller");
const pgSession = require("connect-pg-simple")(session);
const LocalStrategy = require("passport-local").Strategy;

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

app.use(passport.session());

app.use(express.urlencoded({ extended: false }));

app.use(isAuthenticatedController);

app.use("/", router);

app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

passport.use(loginController.localStrategy());

passport.serializeUser(loginController.serializeUser);

passport.deserializeUser(loginController.deserializeUser);

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`App listening on port ${PORT}!`);
});
