module.exports = {
  ensureAuth: (req, res, next) => {
    if (req.isAuthenticated()) return next();
    else res.redirect(`${process.env.FRONTEND_HOST}/`);
  },
  ensureGuest: (req, res, next) => {
    if (req.isAuthenticated()) res.redirect(`${process.env.FRONTEND_HOST}/user/profile-page`);
    else return next();
  },
  isAdmin: (req, res, next) => {
    if (req.session.isAdmin) return next();
    else res.redirect(`${process.env.FRONTEND_HOST}/`);
  },
  notAdmin: (req, res, next) => {
    // if (req.session.isAdmin) res.redirect("/request/admin");
    // else return next();
    next();
  },
};
