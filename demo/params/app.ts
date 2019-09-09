/**
 * 测试params
 */
import Axios from '../../src/index';
Axios({
    url: '/params',
    method: 'GET',
    params: {
        a:{a:1,b:2},
        b:2,
        c:3,
        d:[1,2,3,new Date()],
    }
})