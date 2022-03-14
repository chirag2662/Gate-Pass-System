const express = require("express");
const passport = require("passport");
const dotenv = require("dotenv");
const router = express.Router();
dotenv.config();
const frontEnd_Host=process.env.FRONTEND_HOST;

router.get("/", (req, res) => {
  res.render("main");
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/login/google",
  passport.authenticate("google", {
    successRedirect: `${frontEnd_Host}/user/profile-page`,
    failureRedirect: `${frontEnd_Host}/`,
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(`${frontEnd_Host}`);
});
module.exports = router;
