import { AxiosTransForm } from './../types/index'
export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransForm | AxiosTransForm[]
): any {
  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  fns.forEach(item => {
    item(data, headers)
  })
  return data
}
