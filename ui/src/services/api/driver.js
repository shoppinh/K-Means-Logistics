import { api } from "../base";
const PREFIX = "driver";

const driverApi = {
  getDrivers: () => {
    return api.get(PREFIX);
  },
};
export default driverApi;
