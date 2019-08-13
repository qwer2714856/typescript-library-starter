import { AxiosRequestConfig } from './types/index'
import { fmtUrl } from './tools/url'
import { processHeaders } from './tools/header';
/**
 * @description 入口文件
 *
 */

import XHR from './xhr'
import { transformRequest } from './tools/data';

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  XHR(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.headers = processHeaders(config.headers, config.data);
  config.url = transformUrl(config)
  config.data = transformData(config);
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, data } = config

  return fmtUrl(url, data)
}

function transformData(config:AxiosRequestConfig):any {
  return transformRequest(config.data);
}

export default axios
