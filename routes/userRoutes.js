const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const userController = require("../Controllers/userController");
const requestController = require("../Controllers/requestController");

router.get("/profile-page", ensureAuth, userController.getUser);
router.get("/update-form", ensureAuth, userController.getUpdatePage);
router.post("/updateMe", ensureAuth, userController.updateMe);
router.post("/request-form", ensureAuth, userController.getRequestPage);
module.exports = router;
