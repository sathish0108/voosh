import Axios from "axios";

const site = "https://meta.novactech.in:4000/";

const instance = Axios.create({
  baseURL: site,
});
instance.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instance;
