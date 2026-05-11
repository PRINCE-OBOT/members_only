const passportAuthController = (err, user, info) => {
  if (err) return next(err);

  if (!user) {
    return res.json({ message: "Login failed", error: info.message });
  }

  req.logIn(user, (err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};

module.exports = passportAuthController;
