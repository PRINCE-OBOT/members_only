const express = require("express");
const { join } = require("path");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const router = require("./routes/index");
const pool = require("./db/pool");
const loginController = require("./controllers/log-in-controller");
const isAuthenticatedController = require("./controllers/is-authenticated-controller");
const errorController = require("./controllers/error-controller");
const flash = require("connect-flash");
const pgSession = require("connect-pg-simple")(session);
const LocalStrategy = require("passport-local").Strategy;

const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

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

app.use(flash());

app.use(isAuthenticatedController);

app.use("/", router);

app.post("/log-in", passportAuthController);

passport.use(loginController.localStrategy());

passport.serializeUser(loginController.serializeUser);

passport.deserializeUser(loginController.deserializeUser);

function passportAuthController(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(404).render("index", {
        pageTemplate: "login",
        error: info.message
      });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);

      return res.redirect("/");
    });
  })(req, res, next);
}

app.use(errorController);

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`App listening on port ${PORT}!`);
});
