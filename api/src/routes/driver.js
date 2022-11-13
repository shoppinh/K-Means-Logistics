const express = require("express");
const router = require("express-promise-router")();
const driverController = require("../app/controllers/DriverController");
const {
  validateBody,
  validateParam,
  validateQuery,
  schemas,
} = require("../helpers");

router
  .route("/")
  .get(validateQuery(schemas.paginationQuerySchema),driverController.getAll)
  .post(validateBody(schemas.driverSchema), driverController.createDriver);

router
  .route("/:driverId")
  .get(validateParam(schemas.idSchema, 'driverId'), driverController.getDriverById)
  .put(
    validateParam(schemas.idSchema,'driverId'),
    validateBody(schemas.driverOptionalSchema),
    driverController.updateDriver
  )
  .delete(validateParam(schemas.idSchema,'driverId'), driverController.deleteDriver);

module.exports = router;
