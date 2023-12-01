import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo
      ? JSON.parse(userInfo).accessToken
      : null;
    if (token) {
      config.headers.token = `Bearer ${token}`;
    }
    return config;
  }
  // (error) => {
  //   return Promise.reject(error);
  // }
);

export default axios;
