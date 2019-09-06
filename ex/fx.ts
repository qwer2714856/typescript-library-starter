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