function isAuthenticatedController(req, res, next) {
  const path = req.path;

  if (path !== "/log-in" && path !== "/sign-up" && !req.isAuthenticated()) {
    return res.status(401).render('index', { title: 'Log in', pageTemplate: 'login'});
  }

  next();
}

module.exports = isAuthenticatedController;
