/**
 * @description 入口文件
 *
 */
import { AxiosRequestConfig, AxiosPromise, AxiosInstance, AxiosStatic } from './types/index'
import { fmtUrl } from './tools/url'
import { processHeaders, flattrHeaders } from './tools/header'
import { transformResponse, transformRequest } from './tools/data'
import XHR from './xhr'
import Ax from './core/Ax'
import { ext } from './tools/utils'
import defaults from './default'
import transform from './core/transform'
import mergeConfig from './core/mergeconfig'
import Ct from './cancel/ct'
import { isCancel } from './cancel/cancel'

function throwIfCancelRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequestd()
  }
}

function axios(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancelRequested(config)
  processConfig(config)
  return XHR(config).then(res => {
    res.data = transform(res.data, res.headers, res.config.transformResponse)
    return res
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattrHeaders(config.headers, config.method)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url = '', data } = config

  return fmtUrl(url, data)
}

function transformData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function ft(defaults: AxiosRequestConfig): AxiosStatic {
  const ax = new Ax(defaults)

  const instance: AxiosInstance = Ax.prototype.request.bind(ax)
  ext(instance, ax)

  return instance as AxiosStatic
}
const k: AxiosStatic = ft(defaults)
k.create = (config?: AxiosRequestConfig) => {
  return ft(mergeConfig(defaults, config))
}
k.CancelToken = Ct
k.isCancel = isCancel

export { axios }
export default k
