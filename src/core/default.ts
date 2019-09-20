import { AxiosConfig } from '../types/index'

const defaults: AxiosConfig = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json,text/plain,*/*'
    }
  },

  transformRequest: [
    function(data: any, headers: any): any {
      console.log(data, headers, '====>>transformRequest')
      return null
    }
  ],

  transformResponse: [
    function(data: any): any {
      console.log(data, '====>>transformResponse')
      return null
    }
  ],
  withCredentials: false,
  vd: num => {
    return num <= 300 && num >= 200
  }
}

const gMethod = ['get']
const pMethod = ['post']
gMethod.forEach(methd => {
  defaults.headers[methd] = {}
})
pMethod.forEach(methd => {
  defaults.headers[methd] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
