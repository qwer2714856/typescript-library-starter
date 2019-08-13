import { AxiosRequestConfig } from './types/index'
import { fmtUrl } from './tools/url'
/**
 * @description 入口文件
 *
 */

import XHR from './xhr'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  XHR(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, data } = config

  return fmtUrl(url, data)
}

export default axios
