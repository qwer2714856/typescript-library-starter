import Axios from '../../src/index';
Axios({
    url: '/data',
    method: 'POST',
    data: {
        a:1,
        b:2,
    },
    headers:{

    },
})