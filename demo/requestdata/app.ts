import Axios,{ AxiosError, AxiosConfig, AxiosResponse } from '../../src/index';
let cancel;
Axios.interceptors.request.use((config:AxiosConfig)=>{
    console.log(123);
    return config;
})
Axios.interceptors.response.use((res:AxiosResponse)=>{
    console.log(res, '====>>');
    return res
})
Axios({
    url: '/data',
    method: 'POST',
    data: {
        a:1,
        b:2,
    },
    headers:{
        // 'content-type':'application/x-www-form-urlencoded;charset=utf-8',
    },
    transformRequest:(data, headers)=>{
        console.log(data, '----->' ,headers, '=====---->');
    },
    cancelToken: new Axios.cancelToken((c)=>{
        cancel = c;
        console.log('already in')
    })
}).then((res)=>{
    console.log(res);
}, (e:AxiosError) => {
console.log(e);
})
setTimeout(()=>{
    cancel("123")
})


// 注意这里即便是定义了类型如果服务端不按照约定来照样报错。推导不等于约定。
// Axios.get<{message:string}>('/demo1').then(res=>{
//     console.log(res.data.message)
// })
