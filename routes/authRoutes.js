const express = require("express");
const passport = require("passport");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/",(req, res) => {
  res.render("main");
});

router.get(
  "/auth/google",
  passport.authenticate('google', {
    scope: ['email', 'profile']
  })
);

router.get('/login/google',
passport.authenticate('google', {
  successRedirect: '/profile-page',
  failureRedirect: '/'
})
);

router.get('/profile-page', ensureAuth, (req, res) => {
    res.render("userProfile");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
module.exports = router;
