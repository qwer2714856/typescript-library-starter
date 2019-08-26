/**
 * 为工具导出的所有函数编写测试用例
 */
import {
    isDate,
    isObject,
    getTypes,
} from '../src/tools/utils';
import axios from '../src/index'
import { getAjaxRequest } from './getAjaxRequest';

const JasmineCore = require('jasmine-core');
// @ts-ignore // 忽略检测次句是否正确
global.getJasmineRequireObj = function(){ // 定义他的目的是jasmine-ajax依赖于这方法。
    return JasmineCore;
}

require('jasmine-ajax');

// 定义一组测试
describe('helps:utils', () => {
    describe('isXX', () => { // 内组测试
        test('isDate', ()=>{ // 定义单个的测试用例
            // expect断言函数 判断代码的预期结果和我们的实际结果是否一致。
            // expect(isDate(new Date())) 我们的实际结果  toBeTruthy 我们的预计结果
            expect(isDate(new Date())).toBeTruthy(); // 预期值的语法糖https://www.cnblogs.com/Wolfmanlq/p/8018370.html
            // toBe(预期值)
            // 对象比较 toEqual
            // toBe toEqual 的区别 toBe 普通类型是值比较对象是地址比较 toEqual 比较格式 通常对象的都用这个。
            // expect(c.foo).not.toBe(b.foo) c.foo 和 b.foo不是一个引用
            // 比较json字符串是要加引号的 toBe('{"a":1}')
            // jest的一个api jest.fn 可以mock一个函数 fn返回的是一个函数 可以把这个mock出来的函数传给其它函数
            // const c = jest.fn(()=>{return 'a'})  c就是个函数 执行这个函数返回a
            // toHaveBeenCalled() 函数被调用了。
            // toHaveBeenCalledWith 我们调用的时候使用了什么参数。
        })
    })
})

// 异步测试用例
describe('requests', ()=>{
    beforeEach(()=>{// 每个测试用例运行前钩子
        // @ts-ignore
        jasmine.Ajax.install(); // 每个测试用例执行就安装。 
        
    })
    afterEach(()=>{ // 每个测试用例运行后钩子
        // @ts-ignore
        jasmine.Ajax.uninstall(); // 运行后卸载
        
    })

    test('foo', (done)=>{
    
        // axios('/foo')
        // return getAjaxRequest().then(request => { // 异步测试
        //     expect(request.url).toBe('/foo');
        //     expect(request.method).toBe('GET');
        //     // 模拟一个响应响应是200，它可以控制响应是多少。
        //     request.respondWith({
        //         status: 200
        //     })
            // 如果它模拟响应200 axios('/foo') 的then的  response.config.method.toBe('post')就会执行
            

           // 对返回json对象做断言
           // axios().then(res=>{response=res})  setTime(()=>{ 在这对response做断言}, 100)  然后执行done()
           // done.fail('xxx') 直接判断测试失败
           // 在构造函数上添加   /* istanbul ignore next */ 就会解决  构造函数造成 50 的那个问题 忽略整个构造函数的测试。
        })
    })


/*
PASS  test/utils.test.ts
  helps:utils
    isXX
      ✓ isDate (8ms)
      测试结果
*/