/**
 * 设计模式
 */
/**
 * 工厂模式
 * @description 工厂模式简而言之，就是要替代掉“new操作符”！

               为什么需要替代new操作符？

               因为有时候创建实例时需要大量的准备工作，而将这些准备工作全部放在构造函数中是非常危险的行为，有必要将创建实例的逻辑和使用实例的逻辑分开，方便以后扩展。

               举个例子：
 */
// interface C<T=any>{
//     new ():T
// }
// interface P{
//     name:string
//     age:number
// }
// class People implements P {
//     name: string;
//     age: number;
// }
// async function factory<T=any>(c:C):Promise<T>{
//     // 在这里可以通过各种异步操作最后来填充构造c类
//     return Promise.resolve(new c());
// }
// factory<People>(People).then(res=>{
//     console.log(res)
// }, () => {
// })
/**
 * 单例模式
 *
 */
//  // 饿汉
//  class People{
//      static instance = new People();
//      private constructor(){}
//  }
//  console.log(People.instance)
//  console.log(People.instance)
// 懒汉单例
var People = /** @class */ (function () {
    function People() {
    }
    People.getInstance = function () {
        if (!People.instance) {
            People.instance = new People();
        }
        return People.instance;
    };
    People.instance = null;
    return People;
}());
console.log(People.getInstance());
