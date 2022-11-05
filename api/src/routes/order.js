const express = require("express");
const router = require("express-promise-router")();
const orderController = require("../app/controllers/OrderController");
const { validateBody, validateParam, schemas } = require("../helpers");

router
  .route("/")
  .get(orderController.getAll)
  .post(validateBody(schemas.orderSchema), orderController.createOrder);

router
  .route("/:orderId")
  .get(validateParam(schemas.idSchema, "orderId"), orderController.getOrderById)
  .put(
    validateParam(schemas.idSchema, "orderId"),
    validateBody(schemas.orderOptionalSchema),
    orderController.updateOrder
  )
  .delete(
    validateParam(schemas.idSchema, "orderId"),
    orderController.deleteOrder
  );

module.exports = router;
