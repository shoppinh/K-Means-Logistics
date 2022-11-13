import { api } from "../base";
const PREFIX = "order";

const orderApi = {
  getOrders: (query) => {
    return api.get(PREFIX,{ params: query });
  },
 
};
export default orderApi;
