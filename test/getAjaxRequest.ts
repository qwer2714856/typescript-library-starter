/**
 * 测试用例的请求
 */
export function getAjaxRequest():Promise<JasmineAjaxRequest>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            // jasmine.Ajax.requests.mostRecent() 模拟了xhr 提供了相关的api then 它后可以拿到类似 request.url 等等。
            return resolve(jasmine.Ajax.requests.mostRecent());
        }, 0)
    })
}