/**
 * 泛型
 */
// interface Sql<T=any>{
//     say(s:T):T;
// }
// class M<T=any> implements Sql<T>{
//     say(s:T):T{
//         return s;
//     }
// }
// new M<string>();

// 类型推断 这里调用没有直接传入T类型而是根据后面的参数推断出string 如果有些编辑器无法推断类型还是需要传入泛型的，所以还是传入泛型吧。
// function A<T>(aa:T):T{
//     return aa;
// }
// A("")

// 泛型类型
// interface X<T=any>{
//     <T>(a:T):T
// }
// 静态类型是不能使用泛型类型的，泛型类型描述的是非静态属性。
// class A<T=any>{
//     static mq:T;
//     name:T;
// }

// 泛型约束
// 可以通过接口约束我们的泛型。
// 定义一个泛型的余数
// interface YSTS{
//     length:number
// }
// interface YS<T=any>{
//     say(s:T):number
// }
// class Bs<T extends YSTS> implements YS<T>{
//     say(s:T){
//         // 默认没有泛型约束是报错
//         return s.length
//     }
// }
// 这样可以约束传进来的东西必须有个length的属性否则报错

// 约束一个属性必须存在一个对象内。 约束k必须在obj中的属性
// function M<T,K extends keyof T>(obj:T, k:K){

// }
// M({a:1},'a');

// 泛型工厂
// function fFactory<T>(
//     c:new ()=>T
// ):T{
//     return new c();
// }

// 类型推断
// let a = 3;// 字段推断为number

// 通用类型 -- 根据 初始化的类型创建联合数据类型  number|string|null
// let x = [1,'',null]; // 这些个内容是候选类型。和元祖差不多。
// x.push({}) // 这里push是不行的。因为初始化联合类型没有Obj。

// 注意初始化数组的如果是对象推断有问题。
// let x = [new Object(),new Object()] // 这样推断就会有问题。

// 上下文类型
// window.onmousedown = (e) => {
//     // 这里e没有定义类型
//     // 会根据上线文去猜测，所以e是可以点出来的。
// // 如果给 e 指定了类型，上下文类型就失效了。
    
// }

/**
 * 高级类型
 */
// 交叉类型 两个类型的并集
// function M<T,U>(obj1:T, obj2:U):T&U{
//     let o = {} as T & U;

//     for(let i in obj1){
//         o[i] = obj1[i] as any; // 这里需要加断言any否则编译过不去
//     }
//     for(let j in obj2){
//         o[j] = obj2[j] as any;
//     }

//     return o;
// }


// 联合类型 返回任意类型 返回其中一个。 T对象和U对象共有的可以访问不能访问他们单独有的。 比如T 有 ab  U ae 那么返回值类型只能访问a
// function createFactory<T,U>(obj1:T, obj2:U):T|U{
//     return obj1;
// }

// 类型保护
// 类型断言  （xxx as（断言）某个类型）.你断言类型的方法


// 类型谓词 -- sd()后面写谓词
// function sd(arg:any):arg is string{
//     return typeof arg === 'string';
// }
// sd("");
// if(sd("")){
//     // 在这个判断分支可以用这个类型的方法
// }

// typeof

// instanceof

// if(xxx typeof xxx){
// 这里可以用 typeof后面的类型方法
// }
// if(xxx instanceof xxx){

// }

// // !断言
// function a(ax:string|null){
//     // ax 是可选的断言ax一定不是Null
//     return ax!.length;
// }

// 字符串自变量 类似枚举
// type mq = "a"|"b"|"c";
// let a:mq = "a"