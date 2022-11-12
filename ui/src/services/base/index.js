import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8080/api/",
  withCredentials: true,
  timeout: 60000,
});
api.interceptors.request.use(
  (req) => {
    // Add configurations here
   
    req.headers = {
      ...(req.headers || {}),
      Accept: "application/json",
      lang: "vn",
    };
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
api.interceptors.response.use(
  (res) => {
    // Add configurations here
    if (res?.data) return res.data;
    return res;
  },
  async (err) => {
    return Promise.reject(err);
  }
);

export { api };
