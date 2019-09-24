import { AxiosConfig, MainAxios } from './../types/index'
import { xhr } from '../core/xhr'
import { fmtUrl } from '../utils/url'
import { isObject } from 'util'
import { transformRequestData } from '../utils/data'
import { normalizeHeaderName } from '../utils/base'
/**
 * 对外输出库的主入口
 */
function processParams(config: AxiosConfig): string {
  const { url, params } = config
  let rs = url

  if (url && isObject(params)) {
    rs = fmtUrl(params, url)
  }

  return rs
}

function processHeaderName(config: AxiosConfig): void {
  const { headers } = config

  normalizeHeaderName(headers, 'Content-Type')
}

function processRequestData(config: AxiosConfig): string {
  const { data } = config

  return transformRequestData(data)
}

function processConfig(config: AxiosConfig): void {
  config.url = processParams(config)
  config.data = processRequestData(config)
  processHeaderName(config)
}

const mainAxios: MainAxios = (config: AxiosConfig) => {
  processConfig(config)

  xhr(config)
}

export default mainAxios
