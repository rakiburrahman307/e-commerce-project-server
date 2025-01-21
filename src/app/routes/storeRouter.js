const express = require("express");
const storeControllers = require("../controllers/storeControllers");
const storeZodValidations = require("../zodValidationSchema/storeZodValidationSchema");
const validateRequest = require("../middleware/validateRequest");

const router = express.Router();

// create a new store
router.post(
  "/create-store",
  validateRequest(storeZodValidations.storeValidationSchema),
  storeControllers.createStore
);

module.exports = router;
