import Request from "./request";
import type { RequestConfig } from "./types";
export const request = new Request({
  baseURL: process.env.VUE_APP_APIHOST,
  // baseURL:'/api',
  timeout: 1000 * 60 * 5,
  headers:{
    // 'content-type':'multipart/form-data'
    'content-type':'application/x-www-form-urlencoded; charset=UTF-8',
    
  },
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config) => {
      return config;
    },
    // 响应拦截器
    responseInterceptors: (result) => {
      return result;
    },
  },
});
interface Api<T> extends RequestConfig {
  data?: T;
}
// 响应返回值类型
interface ResponseType<T> {
  response_code: string;
  response_msg: string;
  data?: T;
}

const api = <D, T = any>(config: Api<D>) => {
  return request.request<ResponseType<T>>(config);
};


export default api;
