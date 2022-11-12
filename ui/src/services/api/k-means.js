import { api } from "../base";
const PREFIX = "k-means";

const kMeansApi = {
  assignDriver: (input) => {
    return api.post(PREFIX + '/assign-drivers',input);
  },
};
export default kMeansApi;
