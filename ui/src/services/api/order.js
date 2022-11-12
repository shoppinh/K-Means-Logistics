import { api } from "../base";
const PREFIX = "order";

const orderApi = {
  getOrders: () => {
    return api.get(PREFIX);
  },
};
export default orderApi;
