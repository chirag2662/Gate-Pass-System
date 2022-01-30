const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get('/profile-page', ensureAuth, (req, res) => {
    res.render("userProfile");
});

module.exports = router;