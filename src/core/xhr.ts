import { AxiosConfig } from '../types'

function xhr(config: AxiosConfig): void {
  const { data = null, url, method = 'get' } = config

  let requestObj: XMLHttpRequest = new XMLHttpRequest()

  requestObj.open(method.toUpperCase(), url, true)

  requestObj.send(data)
}

export default xhr
