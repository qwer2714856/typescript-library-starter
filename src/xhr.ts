import { AxiosRequestConfig } from './types'

export default (config: AxiosRequestConfig): void => {
  const { data = null, method = 'get', url, params } = config

  const Request = new XMLHttpRequest()

  Request.open(method.toLocaleUpperCase(), url, true)

  const arams = new URLSearchParams('')
  for (let i in data) {
    arams.append(i, data[i])
  }

  Request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;')
  Request.send(arams.toString())
}
