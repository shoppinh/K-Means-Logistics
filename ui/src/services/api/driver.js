import { api } from "../base";
const PREFIX = "driver";

const driverApi = {
  getDrivers: (query) => {
    return api.get(PREFIX, {params: query});
  },
  createDriver: (query)=> {
    return api.post(PREFIX, query);
  },
  updateDriver: (id, query)=> {
    return api.put(`${PREFIX}/${id}`, query);
  },
  deleteDriver: (id)=> {
    return api.delete(`${PREFIX}/${id}`);
  },
};
export default driverApi;
