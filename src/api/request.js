import axios from "axios";

const service = axios.create({
  timeout: 5000,
});
// 请求拦截
service.interceptors.request.use(
  (config) => {
    if (localStorage.USERTOKEN) {
      config.headers["Authorization"] = "Bearer " + localStorage.USERTOKEN;
    }
    return config;
  },
  (err) => {
    console.log("请求拦截错误信息", err);
  }
);
// 响应拦截
service.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    console.log("响应拦截错误信息", err);
  }
);

export default service;
