function isAuthenticatedController(req, res, next) {
  const path = req.path;

  if (!req.isAuthenticated()) {
    return res
      .status(401)
      .render("index", { title: "Log in", pageTemplate: "login" });
  }

  next();
}

module.exports = isAuthenticatedController;
