const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const userController = require("../Controllers/userController");
const requestController = require("../Controllers/requestController");
const { getAllRequestForAdmin, updateRequestStatus } = require("../Controllers/authController");

router.post("/new-request", ensureAuth, requestController.createRequest);
router.delete(
  "/delete-request/:id",
  ensureAuth,
  requestController.deleteRequest
);
router.get("/request-form", ensureAuth, requestController.getRequestForm);

router.get("/admin", ensureAuth, getAllRequestForAdmin);
router.get("/admin/:requestId/:status", ensureAuth, updateRequestStatus );

module.exports = router;
