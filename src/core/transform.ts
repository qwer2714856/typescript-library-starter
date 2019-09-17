import { Transform } from '../types'

export default function transform(
  data: any,
  headers: any,
  AxiosTransform?: Transform | Transform[]
): any {
  if (!AxiosTransform) {
    return data
  }
  if (!Array.isArray(AxiosTransform)) {
    AxiosTransform = [AxiosTransform]
  }
  AxiosTransform.forEach(i => {
    data = i(data, headers)
  })
  return data
}
