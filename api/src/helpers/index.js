const Joi = require("@hapi/joi");

const validateBody = (schema) => {
  return (req, res, next) => {
    const validatorResult = schema.validate(req.body);

    if (validatorResult.error) {
      return res.status(400).json(validatorResult.error);
    } else {
      if (!req.value) req.value = {};
      if (!req.value["params"]) req.value.params = {};

      req.value.body = validatorResult.value;
      next();
    }
  };
};

const validateQuery = (schema) => {
  return (req, res, next) => {
    console.log("🚀 ~ file: index.js ~ line 22 ~ return ~ req.query", req.query)
    const validatorResult = schema.validate(req.query);
    if (validatorResult.error) {
      return res.status(400).json(validatorResult.error);
    } else {
      if (!req.value) req.value = {};
      if (!req.value["params"]) req.value.params = {};

      req.value.query = validatorResult.value;
      next();
    }
  }
}

const validateParam = (schema, name) => {
  return (req, res, next) => {
    const validatorResult = schema.validate({ param: req.params[name] });

    if (validatorResult.error) {
      return res.status(400).json(validatorResult.error);
    } else {
      if (!req.value) req.value = {};
      if (!req.value["params"]) req.value.params = {};

      req.value.params[name] = req.params[name];
      next();
    }
  };
};

const schemas = {
  driverSchema: Joi.object().keys({
    name: Joi.string().required(),
    phoneNumber: Joi.string().min(10).required(),
  }),
  driverOptionalSchema: Joi.object().keys({
    name: Joi.string(),
    phoneNumber: Joi.string().min(10),
  }),
  orderSchema: Joi.object().keys({
    orderDate: Joi.date().required(),
    senderName: Joi.string().required(),
    senderFullAddress: Joi.string().required(),
    recipientName: Joi.string().required(),
    recipientFullAddress: Joi.string().required(),
    latitudeFrom: Joi.number().required(),
    longitudeFrom: Joi.number().required(),
    latitudeTo: Joi.number().required(),
    longitudeTo: Joi.number().required(),
  }),
  orderOptionalSchema: Joi.object().keys({
    orderDate: Joi.date(),
    senderName: Joi.string(),
    senderFullAddress: Joi.string(),
    recipientName: Joi.string(),
    recipientFullAddress: Joi.string(),
    latitudeFrom: Joi.number(),
    longitudeFrom: Joi.number(),
    latitudeTo: Joi.number(),
    longitudeTo: Joi.number(),
  }),
  idSchema: Joi.object().keys({
    param: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  }),
  paginationQuerySchema: Joi.object().keys({
    skip: Joi.number(),
    limit: Joi.number(),
    text: Joi.string(),
  }),
  assignDriversSchema: Joi.object().keys({
    orders: Joi.array().items(Joi.object().keys({
      orderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      orderDate: Joi.date().required(),
      senderName: Joi.string(),
      senderFullAddress: Joi.string(),
      recipientName: Joi.string(),
      recipientFullAddress: Joi.string(),
      latitudeFrom: Joi.number().required(),
      longitudeFrom: Joi.number().required(),
      latitudeTo: Joi.number().required(),
      longitudeTo: Joi.number().required(),
    })),
    drivers: Joi.array().items(Joi.object().keys({
      driverId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      name: Joi.string().required(),
      phoneNumber: Joi.string().min(10).required(),
    })),
  }),
};

module.exports = {
  validateBody,
  validateParam,
  validateQuery,
  schemas,
};
