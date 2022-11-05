const express = require("express");
const kMeanController = require("../app/controllers/KMeansController");
const router = require("express-promise-router")();
const {
  validateBody,
  schemas,
} = require("../helpers");
router.route("/assignDrivers").post(validateBody(schemas.assignDriversSchema), kMeanController.assignDrivers);
router.route("/groupOrders").post(kMeanController.groupOrders);

module.exports = router;
