import { api } from "../base";
const PREFIX = "driver";

const driverApi = {
  getDrivers: (query) => {
    return api.get(PREFIX, {params: query});
  },
};
export default driverApi;
