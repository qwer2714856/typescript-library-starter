import axios, {AxiosError} from '../../src/index'
// 这里不能直接用源码里面的类型我们需要导出声明文件库外需要自己实现类型文件。 除了使用d.ts 自定义声明文件也可以使用 export * from 内部的ts文件


// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: ['bar', 'baz']
//   }
// })
//
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: {
//       bar: 'baz'
//     }
//   }
// })
//
// const date = new Date()
//
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     date
//   }
// })
//
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: '@:$, '
//   }
// })
//
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: 'bar',
//     baz: null
//   }
// })
//
// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })
//
// axios({
//   method: 'get',
//   url: '/base/get?foo=bar',
//   params: {
//     bar: 'baz'
//   }
// })
//
// axios({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     a: 1,
//     b: 2
//   }
// })
//
// axios({
//   method: 'post',
//   url: '/base/post',
//   headers: {
//     'content-type': 'application/json;charset=utf-8'
//   },
//   data: {
//     a: 1,
//     b: 2
//   }
// })
//
// const arr = new Int32Array([21, 31])
//
// axios({
//   method: 'post',
//   url: '/base/buffer',
//   data: arr
// })
//
//
// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)
//
// axios({
//   method: 'post',
//   url: '/base/post',
//   data: searchParams
// })

// axios({
//   method: 'post',
//   url: '/base/post',
//   headers:{
    
//   },
//   responseType: 'json',
//   data: {
//     a: 1,
//     b: 2,
//     c: [1,2,3,4],
//     d: new Date(),
//     e: 1
//   },
// }).then((res)=>{
// console.log(res);
// },(res:AxiosError)=>{
//   console.log(res.config);
//   console.log(res.message);
// })
// axios.get('/error/get').then((res)=>{
//   console.log(res);
// })

// axios('/error/get').then((res)=>{
//   console.log(res);
// })

// const ay = new Int32Array([21,43]);
// axios({
//   method:'post',
//   url: '/base/buffer',
//   data: ay,
// })

// axios({
//   method: 'post',
//   url: '/base/post',
//   responseType: 'json',
//   data: {
//     a: 3,
//     b: 4
//   }
// }).then((res) => {
//   console.log(res)
// })


// 定义返回类型的格式 - 这个是包在大报文里面的data
// interface ResponseData<T=any>{
//   code: number
//   result: T
//   message: string
// }
// interface User{
//   name: string
//   age: number
// }

// axios.get<ResponseData<User>>('/extend/user').then(res => {
//   console.log(res);
// })

// 拦截器的demo
axios.interceptors.request.use((config)=>{
  console.log(1);
  return config;
})
axios.interceptors.request.use((config)=>{
  console.log(2);
  return config;
})
const tk = axios.CancelToken;
const ifc = tk.source();

axios({
  url:'/interceptor/get',
  method: 'get',
  cancelToken: ifc.token,
  xsrfCookieName:'XSRF-TOKEN',
  xsrfHeaderName:'token',
  withCredentials:true,
  onDownloadProgress:(e) => {
    // 进度库nprogress
    // 安装对应的types文件否则报错 
    // e
    //   loaded 现在加载了几个
    //   total 一共多少个
    console.log(e);
  },
  auth:{
    username:"aaaa",
    password:"bbbb"
  }
}).then((res)=>{
  console.log(res, '====>')
})
setTimeout(()=>{
  ifc.cancel("ccccc");
})
