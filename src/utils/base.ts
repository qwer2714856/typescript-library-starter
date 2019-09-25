export function normalizeHeaderName(headers: any, name: string): void {
  if (headers) {
    Object.keys(headers).forEach(key => {
      if (key !== name && key.toLocaleLowerCase() === name.toLocaleLowerCase()) {
        headers[name] = headers[key]
        delete headers[key]
      }
    })
  }
}

export function parseHeaders(headers: string): any {
  if (!headers) {
    return headers
  }

  let rs = Object.create(null)

  headers.split('\r\n').forEach(v => {
    let [key, val] = v.split(':')

    key.trim() && (rs[key.trim()] = val.trim())
  })

  return rs
}
