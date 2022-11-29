import { api } from "../base";
const PREFIX = "order";

const orderApi = {
  getOrders: (query) => {
    return api.get(PREFIX,{ params: query });
  },
  createOrder: (payload) => {
    return api.post(PREFIX, payload);
  },
  updateOrder: (id, payload) => {
    return api.put(`${PREFIX}/${id}`, payload);
  },
  deleteOrder: (id) => {
    return api.delete(`${PREFIX}/${id}`);
  },
 
};
export default orderApi;
