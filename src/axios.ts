/**
 * @description 入口文件
 *
 */
import { AxiosRequestConfig, AxiosPromise, AxiosInstance } from './types/index'
import { fmtUrl } from './tools/url'
import { processHeaders } from './tools/header'
import { transformResponse, transformRequest } from './tools/data'
import XHR from './xhr'
import Ax from './core/Ax'
import { ext } from './tools/utils'

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return XHR(config).then(res => {
    res.data = transformResponse(res.data)
    return res
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.headers = processHeaders(config.headers, config.data)
  config.url = transformUrl(config)
  config.data = transformData(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url = '', data } = config

  return fmtUrl(url, data)
}

function transformData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function ft(): AxiosInstance {
  const ax = new Ax()

  const instance: AxiosInstance = Ax.prototype.request.bind(ax)
  ext(instance, ax)

  return instance as AxiosInstance
}
const k: AxiosInstance = ft()

export { axios }
export default k
