import Axios,{ AxiosError } from '../../src/index';
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
}).then((res)=>{
    console.log(res);
}, (e:AxiosError) => {
console.log(e);
})
// 注意这里即便是定义了类型如果服务端不按照约定来照样报错。推导不等于约定。
Axios.get<{message:string}>('/demo1').then(res=>{
    console.log(res.data.message)
})