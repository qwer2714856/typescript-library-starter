import { AxiosRequestConfig } from './types/index'
import { processHeaders } from './tools/header'
import { transformRequest, transformResponse } from './tools/data'

const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json,text/plain,*/*'
    }
  },
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  transformRequest: [
    (data: any, headers: any): any => {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    (data: any, headers: any): any => {
      return transformResponse(data)
    }
  ]
}

const methodNoData = ['get']
methodNoData.forEach(i => {
  defaults.headers[i] = {}
})

const methodWithData = ['post']
methodWithData.forEach(j => {
  defaults.headers[j] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
