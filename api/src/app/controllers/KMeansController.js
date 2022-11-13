const kmeans = require("node-kmeans");

const groupOrders = (req, res) => {
  const data = req.body.orders;
  const size = req.body.size;
  let vectors = new Array();
  for (let i = 0; i < data.length; i++) {
    vectors[i] = [data[i]["longitude_to"], data[i]["latitude_to"]];
  }
  kmeans.clusterize(vectors, { k: size }, (err, result) => {
    if (err) return res.status(400).json({ status: "Error" });
    else {
      const json = result;
      return res.status(200).json(json);
    }
  });
};
const assignDrivers = (req, res) => {
  const { orders, drivers } = req.value.body;
  console.log("🚀 ~ file: KMeansController.js ~ line 20 ~ assignDrivers ~ orders", orders)

  if (orders.length == 0 || drivers.length == 0)
    return res.status(400).json({ message: "Error" });
  else {
    let vectors = new Array();
    for (let i = 0; i < orders.length; i++) {
      vectors[i] = [orders[i]["longitudeTo"], orders[i]["latitudeTo"]];
    }
    kmeans.clusterize(vectors, { k: drivers.length }, (err, result) => {
      if (err) {
        return res.status(400).json({ message: "Error" });
      } else {
        let driversAssigned = [];
        let ordersAssigned = [];
        for (let i = 0 ; i < result.length; i++) {
          ordersAssigned = [];
          for (let t = 0; t < result[i].clusterInd.length; t++) {
            ordersAssigned.push({
              orderId: orders[result[i].clusterInd[t]].orderId,
              recipientName: orders[result[i].clusterInd[t]].recipientName,
              // recipient_full_address:
              //   orders[result[i].clusterInd[t]].recipient_full_address,
            });
          }
          driversAssigned.push({
            driverId: drivers[i].driverId,
            name: drivers[i].name,
            phoneNumber: drivers[i].phoneNumber,
            ordersAssigned: ordersAssigned,
          });
        }
        return res.status(200).json(driversAssigned);
      }
    });
  }
};
module.exports = {
  assignDrivers,
  groupOrders,
};
