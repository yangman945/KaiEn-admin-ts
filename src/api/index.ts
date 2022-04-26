import Request from "./request";
import type { RequestConfig } from "./types";
export const request = new Request({
  // baseURL: process.env.VUE_APP_APIHOST,
  baseURL:'/api',
  timeout: 1000 * 60 * 5,
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
  code: number;
  message: string;
  data?: T;
}

const api = <D, T = any>(config: Api<D>) => {
  return request.request<ResponseType<T>>(config);
};


export default api;
