/**
 * 类型接口
 */
interface Types{
    name: string
    age: number
    sex?: string
}
const Tys:Types = {
    name: '123',
    age: 234
}
/**
 * 接口只读属性
 */
interface TypesRd{
   readonly name: string
}

/**
 * 泛型只读数组
 */
let s:ReadonlyArray<number> = [1,2,3];
// s[1] = 1;
// let o:number[];
// o = s;
// o = s as number[];

/**
 * 接口额外属性检查
 */
interface EW{
    name: string
    [propName:string]:any // propName string 字符串索引 number 数字索引 加上这个描述对象可以任意扩展成员
}
let ew:EW = {
    name:'',
    age:12, // age不是接口的描述所以报错。
    sex:13,
}

/**
 * 函数类型
 * @description 对函数的一种描述
 */
interface Func{
    (name:string, age:number):void // 描述多个函数类型
    (clv:string):void
}
// let iFunc:Func = (name:number) => {

// }
// let iFunc:Func = (name:string) => {

// }

/**
 * 可索引类型
 */
// interface KSY{
//     [index:string]:string    
// }
// let ksy:KSY = {
//     '1':'1'
// }
// interface KSY{
//     [index:number]:string    
// }
// let ksy:KSY = {
//     's1s':'1'
// }
// interface KSY{
//     [index:number]:string    
// }
// let ksy:KSY = ['1','3','4'];

/**
 * 接口实现
 */
interface IFC{
    name:string
    sayHello(name:string):string;
}
class cIFC implements IFC {
    name: string;
    sayHello(name: string): string {
        throw new Error("Method not implemented.");
    }
}

/**
 * 接口描述构造函数，用来验证类的。
 */
// interface CT<T=any>{
//     new (name:string, age:number):any
// }
// class MQ{
//     constructor(name:number){
        
//     }
// }
// function l<T=any>(c:CT<T>){
//     new c('', 1);
// }
// l<MQ>(MQ);
// interface CT<T=any>{
//     new (name:string, age:number):any
// }
// class MQ{
//     constructor(name:string, age:number){
        
//     }
// }
// function l<T=any>(c:CT<T>){
//     new c('', 1);
// }
// l<MQ>(MQ);


/**
 * 接口的继承
 */
// interface IFPx{
//     parent:string
// }
// interface IFCx extends IFPx{
//     chidren:string
// }
// class ly implements IFCx {
//     chidren: string;
//     parent: string;
// }

// 多继承用,号分割

/**
 * 混合类型
 * HH具有双重作用， 可以用来描述函数，也可以用来描述对象。
 * 可用来描述静态类。
 */
interface HH{
    (name:string):string

    ax:number
    sayAx():number
}
// let hh = ():HH => {
//     let c = (function(name:string){ return name}) as HH;
//     c.sayAx = () => {
//         return 1
//     }
//     c.ax = 2;
//     return c;
// }
// let c:HH = ((name:string) => { return name}) as HH;

/**
 * 接口继承类，子类只能继承类且实现接口。
 * 这样通过转化，父类的私有属性就会被子类所继承。
 */
// class ABParent{
//     private name:number;
// }
// interface ABParentifc extends ABParent{
//     say():string
// }
// class ABChild extends ABParent implements ABParentifc {
//     say(): string {
//         throw new Error("Method not implemented.");
//     }
// }