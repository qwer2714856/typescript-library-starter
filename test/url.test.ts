import { fmtUrl } from '../src/utils/url'
describe('url', () => {
  describe('url:fmtUrl', () => {
    test('针对url的返回值default类型进行测试', done => {
      expect(
        fmtUrl(
          {
            a: 1,
            b: 2
          },
          '/'
        )
      ).toBe('/?a=1&b=2')
      done()
    })
    test('针对值object的类型进行测试', done => {
      expect(
        fmtUrl(
          {
            a: { a: 1 }
          },
          '/'
        )
      ).toBe('/?a={"a":1}')
      done()
    })
    test('针对array的类型进行测试', done => {
      expect(
        fmtUrl(
          {
            a: [1, 2]
          },
          '/'
        )
      ).toBe('/?a[]=1&a[]=2')

      done()
    })
    test('针对日期进行测试', done => {
      expect(
        fmtUrl(
          {
            a: new Date(111111111111)
          },
          '/'
        )
      ).toBe('/?a=1973-07-10T00:11:51.111Z')
      done()
    })
    test('测试异常分支', done => {
      expect(fmtUrl('sss', '')).toBe('')
      done()
    })
    test('测试#', done => {
      expect(
        fmtUrl(
          {
            a: 1
          },
          '/#eeee'
        )
      ).toBe('/?a=1')

      done()
    })
    test('测试&的补充', done => {
      expect(
        fmtUrl(
          {
            a: 1
          },
          '/?c=1'
        )
      ).toBe('/?c=1&a=1')

      done()
    })
  })
})
