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
  const { data, drivers } = req.value.body;

  if (data.length == 0 || drivers.length == 0)
    return res.status(400).json({ message: "Error" });
  else {
    let vectors = new Array();
    for (let i = 0; i < data.length; i++) {
      vectors[i] = [data[i]["longitude_to"], data[i]["latitude_to"]];
    }
    kmeans.clusterize(vectors, { k: drivers.length }, (err, result) => {
      if (err) {
        return res.status(400).json({ message: "Error" });
      } else {
        const i = 0;
        const t = 0;
        const driversAssigned = [];
        const ordersAssigned = [];
        for (i = 0; i < result.length; i++) {
          ordersAssigned = [];
          for (t = 0; t < result[i].clusterInd.length; t++) {
            ordersAssigned.push({
              order_id: data[result[i].clusterInd[t]].order_id,
              recipient_name: data[result[i].clusterInd[t]].recipient_name,
              recipient_full_address:
                data[result[i].clusterInd[t]].recipient_full_address,
            });
          }
          driversAssigned.push({
            driver_id: drivers[i].driver_id,
            name: drivers[i].name,
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
