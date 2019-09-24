import { AxiosConfig, MainAxios } from './../types/index'
import { xhr } from '../core/xhr'
import { fmtUrl } from '../utils/url'
import { isObject } from 'util'
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
const mainAxios: MainAxios = (config: AxiosConfig) => {
  config.url = processParams(config)
  xhr(config)
}

export default mainAxios
