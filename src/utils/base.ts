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
