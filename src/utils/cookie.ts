const cookie = {
  read(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))

    return match ? decodeURIComponent(match[2]) : null
  },
  write(name: string, value: string): void {
    document.cookie += 'name=' + value + ';'
  }
}

export default cookie
