
const KMeanRouter = require("./k-means")
const driverRouter = require("./driver");
const orderRouter = require("./order")

function route(app) {
  app.use('/api/k-means',KMeanRouter);
  app.use('/api/driver', driverRouter);
  app.use('/api/order', orderRouter);
}
module.exports = route;