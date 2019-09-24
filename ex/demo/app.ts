import axios from '../../src/index';

// axios({
//     url: '/api',
//     method: 'GET',
//     params: {
//         a:[12,23]
//     }
// })

axios({
    url: '/api/post',
    method: 'POST',
    data: {
        a:1
    },
    headers: {
        'content-Type':'application/json;charset=utf-8',
    },
})
// const arr = new Int32Array([21, 31]);

// axios({
//     url: '/api/chunk',
//     method: 'POST',
//     data: arr,
// })