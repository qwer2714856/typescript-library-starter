import Axios from '../../src/index';
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
})