const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const userController = require("../Controllers/userController");
const requestController = require("../Controllers/requestController");

router.post("/new-request", ensureAuth, requestController.createRequest);
router.delete(
  "/delete-request/:id",
  ensureAuth,
  requestController.deleteRequest
);
router.get("/request-form", ensureAuth, requestController.getRequestForm);
module.exports = router;
