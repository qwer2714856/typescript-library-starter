import axios from '../../src/index';

axios({
    url: '/api',
    method: 'GET',
    params: {
        a:[12,23]
    }
})