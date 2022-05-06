import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import type {
  RequestConfig,
  RequestInterceptors,
  CancelRequestSource,
} from "./types";
import { getToken } from "@/utils/cookies";
import whiteList from "../config/default/httpWhiteList";
const token = getToken() as string;
class Request {
  // axios 实例
  instance: AxiosInstance;
  // 拦截器对象
  interceptorsObj?: RequestInterceptors; /*
  存放取消方法的集合
  * 在创建请求后将取消请求方法 push 到该集合中
  * 封装一个方法，可以取消请求，传入 url: string|string[] 
  * 在请求之前判断同一URL是否存在，如果存在就取消请求
  */
  cancelRequestSourceList?: CancelRequestSource[];
  /*
  存放所有请求URL的集合
  * 请求之前需要将url push到该集合中
  * 请求完毕后将url从集合中删除
  * 添加在发送请求之前完成，删除在响应之后删除=00
  */
  requestUrlList?: string[];
  constructor(config: RequestConfig) {
    this.instance = axios.create(config);

    this.interceptorsObj = config.interceptors;
    this.requestUrlList = [];
    this.cancelRequestSourceList = [];
    //   添加请求拦截器
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (!whiteList.includes(config.url as string) && token) {
          console.log(token, "token");
          config.headers!.token = token;
        }
        console.log(config, "全局请求拦截器");
        return config;
      },
      (err: any) => err
    );
    // 使用实例拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch
    );
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch
    );
    //   添加响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        console.log(res, "全局响应拦截器");

        if (res.data.response_code === "0") {
          return res.data;
        } else {
          return res.data;
        }
      },
      (err: any) => err
    );
  }
  request<T>(config: RequestConfig): Promise<T> {
    // return this.instance.request(config);
    return new Promise((resolve, reject) => {
      // 如果为单个请求设置拦截器，则使用单个拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }
      const url = config.url;
      if (url) {
        this.requestUrlList?.push(url);
        const CancelToken = axios.CancelToken;
        config.cancelToken = new CancelToken((cancel) => {
          this.cancelRequestSourceList?.push({
            [url]: cancel,
          });
        });
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors<T>(res);
          }

          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        })
        .finally(() => {
          url && this.delUrl(url);
        });
    });
  }
  // 取消全部请求
  cancelAllRequest() {
    this.cancelRequestSourceList?.forEach((source) => {
      const key = Object.keys(source)[0];
      source[key]();
    });
  }
  // 取消请求
  cancelRequest(url: string | string[]) {
    if (typeof url === "string") {
      // 取消单个请求
      const sourceIndex = this.getSourceIndex(url);
      sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][url]();
    } else {
      // 存在多个需要取消请求的地址
      url.forEach((request) => {
        const sourceIndex = this.getSourceIndex(request);
        sourceIndex >= 0 &&
          this.cancelRequestSourceList?.[sourceIndex][request]();
      });
    }
  }

  /**
   * @description: 获取指定 url 在 cancelRequestSourceList 中的索引
   * @param {string} url
   * @returns {number} 索引位置
   */
  private getSourceIndex(url: string): number {
    return this.cancelRequestSourceList?.findIndex(
      (item: CancelRequestSource) => {
        return Object.keys(item)[0] === url;
      }
    ) as number;
  }
  /**
   * @description: 删除 requestUrlList 和 cancelRequestSourceList
   * @param {string} url
   * @returns {*}
   */
  private delUrl(url: string) {
    const urlIndex = this.requestUrlList?.findIndex((item) => item === url);
    const sourceIndex = this.getSourceIndex(url);
    // 删除url和cancel方法
    urlIndex !== -1 && this.requestUrlList?.splice(urlIndex as number, 1);
    sourceIndex !== -1 &&
      this.cancelRequestSourceList?.splice(sourceIndex as number, 1);
  }
}
export default Request;
