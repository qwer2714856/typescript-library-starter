import { AxiosRequestConfig } from './types/index'
/**
 * @description 入口文件
 *
 */

import XHR from './xhr'

function axios(config: AxiosRequestConfig): void {
  XHR(config)
}

export default axios
