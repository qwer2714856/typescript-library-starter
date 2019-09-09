import { AxiosConfig } from '../types'
import xhr from '../core/xhr'
import { buildUrl } from '../utils/url'

function Axios(config: AxiosConfig): void {
  // 处理config
  processConfig(config)

  // 主请求
  xhr(config)
}

function processConfig(config: AxiosConfig): void {
  const { url, params } = config
  // 格式换params
  config.url = buildUrl(url, params)
}

export default Axios
