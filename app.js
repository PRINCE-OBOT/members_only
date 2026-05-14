const express = require("express");
const { join } = require("path");

const passport = require("passport");
const bcrypt = require("bcryptjs");
const session = require("express-session");

const flash = require("connect-flash");
const methodOverride = require("method-override");

const router = require("./routes/index");
const pool = require("./db/pool");

const loginController = require("./controllers/log-in-controller");
const errorController = require("./controllers/error-controller");

const pgSession = require("connect-pg-simple")(session);
const LocalStrategy = require("passport-local").Strategy;

const passportConfig = require("./config/passport-config");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.set("trust proxy", 1);

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

app.use(methodOverride("_method"));

app.post("/log-in", passportAuthController);

app.use("/", router);

passport.use(passportConfig.localStrategy());

passport.serializeUser(passportConfig.serializeUser);

passport.deserializeUser(passportConfig.deserializeUser);

function passportAuthController(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(404).render("index", {
        pageTemplate: "login",
        title: "Log in",
        error: info.message
      });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);

      return res.redirect("/");
    });
  })(req, res, next);
}

app.use((req, res) => {
  res.status(404).json({
    message: "You seen to have entered the wrong path. path does not exist"
  });
});

app.use(errorController);

if (require.main === module) {
  app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`App listening on port ${PORT}!`);
  });
}

module.exports = app;
