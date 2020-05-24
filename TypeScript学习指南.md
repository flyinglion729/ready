## 入门
#### TypeScript就是一个js的超集，主要提供了类型系统和对ES6的支持，它由Microsoft开发，代码发布在gitHub上开源
* TypeScript有一些优点也有一些缺点，所以可以自行选择是否要使用这个
* 优点在于
```
1.TypeScript增加了代码的可读性和可维护性，大部分函数看看类型的定义就可以知道如何使用了，可以再编译的过程中就发现错误
这总比运行的时候发生错误要好得多，增强了编辑器的IDE功能，包括代码补全、接口提示，跳转定义等
2.TypeScript包容性很强，.js文件可以直接重新命名为.ts，即使不做出显示的类型也能自动做出类型判断

//注意 注意 注意 即使Typescript编译报错，也可以生成js文件
//如果发生报错，还是会生成js文件，这个文件还是可以用的
//如果希望在报错的时候终止对js文件的生成，可以在tsconfig.json 中配置 noEmitOnError 即可。关于 tsconfig.json，请参阅官方手册（中文版）。
```
* 有一定的缺点
```
1.有一定的学习成本，要理解接口（Interfaces）、泛型（Generics）、类（Classes）、枚举类型（Enums）等前端工程师可能不是很熟悉的概念
2.可能和一些库的结合不是那么完美
3.集成到构建流程需要一些工作量
4.短期可能要增加一些开发成本，因为要写一些类型的定义，不过对于一个长期维护的项目，TypeScript能够减少其工作量
```
#### 初步认识TypeScript
* 首先typeScript可以在每一个值声明的时候给予类型判定
* 可以是原始数据类型:布尔值、数值、字符串、null、undefined
```
//以下是对于类型声明的基础用法
let test1 : boolean = false;
let test2 : number = 123;
let test3 : string = "Tom";
let test4 : null = null;
let test5 : undefined = undefined;
//如果声明了数据类型之后修改则会报错
test1 = 222
// 报错信息 typeS.ts(5,1): error TS2322: Type '123' is not assignable to type 'string'.

```
* JavaScript没有空值的概念，在TypeScript中，可以使用void表示没有返回值的函数
```
function alertName():void{
	alert("测试一下")
}
```
* 注意 注意 注意 如果是单纯的let xxx;会被理解成声明了一个任意值 就是下面会说到的any
```
//例如
let test1 : string= "123"
let test1 = 123 //则会报错，因为更改了数据类型

//如果是声明的任意值则不会报错
let test1:any = "hello"
test1 = 123  

//也可以访问到任意值上的对象
test1.setName("Tom")

//有更加简洁的写法，
let test1;
test1 = 123
test1 = "123"
test1.setName("Tom") //都不会报错
```
* 因为有些数据是需要两种数据类型的，从而引进了联合数据类型，可以设置多个类型的声明
```
let test1 : string|number;
test1 = "这是个啥"
test1 = 123
//这样都是不会报错的除非使用了两个类型中都没有的类型
test1 = false //报错
```
* 在访问联合数据类型的属性和方法时，只能访问他们共有的属性和方法，如果另一个属性类型没有这个方法或属性则会报错
```
//这里的参数是something和getLength函数的返回值的共有属性并没有length 所以会报错
function getLength(something: string | number): number {  
    return something.length;
}
```
```
//但是如果是toString则都是有的，所以不会报错
function getString(something: string | number): string {
    return something.toString();
}
```
* 当一个属性被赋值之后，会根据类型推断的规则判断出一个类型
* 从而可以实现调用属性
```
let test:string|number;
test = "我是谁，我在哪，我在干嘛"
console.log(test.length)  //12
test = 123
console.log(test.length)  //编译的时候报错
```
#### Interfaces接口，也称为对象类型
* 定义一个接口就是类似于定义一个对象里的数据类型，并且还有规定对象里数据的数量
* 接口的名字一般采用大写字母做开头
```
interface Test {  //声明一个接口，下面是每个key对应的值所能用的类型
    name: string;
    age: number;
}
let tom : Test = {
    name : "陈",
    age : 23
}
console.log(tom)
```
* 如果相应的key值对应的value值类型不一样，或者说有多出来一个Key都会报错
```
interface Test {  //声明一个接口，下面是每个key对应的值所能用的类型
    name: string;
    age: number;
}
let tom : Test = {
    name : "陈",
    age : "23",  //不是number也会报错
	newName: "里s" //这里会报错
}
console.log(tom)
```
* 有时候我们会希望有些属性是可有可无的，所以可以使用可选属性 ，就不会说一定需要这么多属性
* 可选属性和普通属性差不多，只是在Key值后面加上一个问号
```
interface Test {
    name: string;
    age?: number;  //只需要加上问号即可
}
let tom : Test = {
    name : "陈"
}
console.log(tom)
```
* 还有一些情况，我们可能需要随意添加任何属性的值进入这个对象里面，就可以使用任意属性
* 任意属性是 [propName: string]: any;来实现
* 其中[propName: string]表示任意属性的Key值要取string类型的值
* 其中非常需要注意的地方是： 注意 注意 注意 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是这个任意属性的子集
* 而且一旦添加了任意属性，就没有对象长度限制，可以任意添加多少个key都行
```
interface Newone{
    name:string,
    age:number,
    [propName:string]:any //因为这个是any 所以前面的name和age都包含在内 才会编译成功
}
let tom : Newone = {
    name:"李",
    age:123,
    newName:"张飞", //任意添加两个Key都没问题
    newName2:"关羽"
}
console.log(tom)
```
* 例如以下例子，propName只是规定了string类型就会报错
```
interface Newone{
    name:string,
    age?:number,
    [propName:string]:string //其中age的number类型没有包含在内就会报错
}
let tom : Newone = {
    name:"李",
    age:123,
    newName:"张飞",
    newName2:"关羽"
}
console.log(tom)
```
* 这种报错，其实还能引进联合类型，将propName规定为联合类型也可以解决这个问题 不一定要用any任意值
```
interface Newone{
    name:string,
    age?:number,
    [propName:string]:string|number  //可以复合在一起用
}
let tom : Newone = {
    name:"李",
    age:123,
    newName:"张飞",
    newName2:"关羽"
}
console.log(tom)
```
* 还有一种情况，如果有时候声明了一个key，我并不想后面更改他，可以设置为只读属性
* 注意 注意 注意只读属性只约束在第一次给对象赋值，而不是第一次给属性赋值，换言之，只能在对象中使用这个readonly
```
interface Newrule {
    readonly name:string,
    age:number
}
let coco:Newrule = {
    name:"张飞",
    age:23
}
coco.name = "我是谁"  //因为是只读的 所以会报错
console.log(coco)
```
#### 数组的类型
* 数组的类型比较灵活
* 第一种是常见的，[类型+方括号]来表示数组
```
let arr : number[] = [12,23,35]  //只能有number类型的值
console.log(arr)

arr.push("我是谁") //也不允许使用arr数组的方法进行添加不是规定类型的值
```
* 第二种是使用数组泛型来表示，这个前面还没介绍过 可以看下面的介绍再回来看
```
let fibonacci: Array<number> = [1, 1, 2, 3, 5];
```
* 第三种是用接口来表示数组，这种方法比较少用，除非是用来表示类数组会常用一点
* 详细看文档即可:[](https://ts.xcatliu.com/basics/type-of-array)
#### 函数的类型
* 函数有两种表示类型，一种是函数声明，另一种是函数表达式
* 函数声明还是非常容易表示函数类型的
* 声明参数的类型，然后后面那个是声明函数返回值的类型
* 值得注意的是，无论是那种方式，参数的数量也要一样 不然会报错
```
function getNum (a:number,b:number):number{
    return a + b
}
console.log(getNum(1,2))
console.log(getNum(1,2,3)) //参数多了一个 也会报错 少一个也会报错
```
* 函数表达式的形式可能就要复杂一点，但是也很好理解
* 一般情况可能会写成下面这种
* 但是这种情况，只是右边的匿名函数做了类型声明，左边的mySum还没有，左边的mySum是通过赋值的类型推断自动推断出来的
* 但是这样也不会报错
```
let mySum = function (x:number,y:number){
    return x + y
}
console.log(mySum(2,3))
```
* 如果想要手动设置mySum的类型，则需要像下面这样写
* 注意 注意 注意 下面的=>和ES6里面的=>并不一样，这里仅仅表示的是函数定义，左边是输入类型，=>符号右边是输出类型
```
let mySum :(x:number,y:number)=>number = function (x:number,y:number){
    return x + y
}
console.log(mySum(2,3))
```
* 前面说到，参数是不允许多出来的或者减少，这里就需要引进一个可选参数，实现方式也是一样加一个?号即可，类似于可选属性一样这个参数是可有可无的
* 但是注意  注意 注意 一旦使用了可选参数，可选参数后面就不允许再加入必要参数了
```
function myFunction (a:number,b?:number,c:number):number{  //新加入的c参数是不被允许的 会报错
    return a
}
console.log(myFunction(1))
```
* 在typeScript中允许函数设置一个默认值，当设置了默认值之后这个参数就自动成为可选参数了
* 并且！设置了默认值的可选参数后面可以再继续添加必要参数 这是和可选参数很大不一样的一个点
```
function myFunction(a:number=123,b?:number):number{  //直接在后面加等号即可
    return a + b
}
console.log(myFunction())
```
* 还可以使用ES6的...方法来定义function中剩余的参数
* 事实上，...items是一个数组，所以可以声明为数组，这是默认的
```
function myFunction (arr:any[]=[],...items:any[]):any{
    items.forEach((item,index)=>{
        arr.push(item)
    })
    console.log(arr)
}
let a:any[] = []
myFunction(a,1,2,4,5,8,9)
```
* TypeScript还有一个特性是重载，假如有一个这样的需求，接收到不同类型的参数做出不同类型的处理
* 就可以使用重载
```
function reverse(x:number|string):number|string{
    if (typeof x === "number"){
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === "string") {
        return x.split('').reverse().join('');
    }
}
```
* 但是这里还是有一个问题，就是如果函数输入声明是number那么输出应该也是number才对
* 所以对重载进行了改造，使用多个重载
* 这里需要说明一下，前面几次都是函数定义，最后一次才是函数执行
* 注意 注意 注意 TypeScript会优先从最前面的函数定义开始匹配，所以如果多个函数定义有包含关系，会优先把最精准的放在前面
```
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```
#### 类型断言
* 前面说到使用联合类型的时候，由于只能使用这两个类型的相同属性和方法，所以就把方法局限的很窄，而且很容易报错
* 这个时候可以手动加上一个类型的断言来让typeScript放弃这个判断，实现可以访问某个单类型的属性或者方法
* 实现断言的方法有两种：第一种是最常见的，而且也是官方推荐的使用方法，也是Jsx语法(既react语法)能识别的一种方法
```
值 as 类型
```
* 第二种不常用，而且react语法无法识别，不推荐使用
```
<类型>值
```
* 使用第一种语法解决上述的问题时就容易很多了
```
interface Cat {
    name:string,
    go():void
}
interface Fish {
    name:string,
    notGo():void
}
function isFish(x:Cat|Fish){
    if (typeof (x as Cat).go === "function"){  //用as来断言当前的值为哪种类型
        return true
    }
    return false
}
```
* 有些时候，在我们非常确定一段代码不会出错的时候，但是还是会编译错误，这个时候可以使用类型断言为any
* 因为类型断言为any的时候可以解决TypeScript中类型问题中的最后一个手段了
* 例如下面这个例子，想在window上添加一个属性就是这样
```
window.num = 1 //这样是会报错的，因为typeScript会提示我们window上面没有num这个属性 但是我们初衷只是想添加一个属性而已

(window as any).num = 1 //这个时候就需要手动添加一个any的类型断言
```
* 在这里就产生一个问题，假设两个被规定了类型的值要怎么重新赋值呢，这里涉及到一个类型兼容的问题
* 兼容可以引用js中的继承来理解，下面的表达式可以表示为另一种继承的情况
```
interface Animal {
    name: string;
}
interface Cat {
    name: string;
    run(): void;
}

```
* 上面的等式可以变为下面的继承关系
* 但是在ts中，我们可以用更官方的说法来表达这个表达式，就是 Animal兼容Cat
* 换句话说在类型声明中，有相同部分的类型声明，属性较少的类型会兼容属性较多的类型
```
interface Animal {
    name: string;
}
interface Cat extends Animal {
    run(): void;
}
```
* 当Animal兼容Cat的时候，他们就可以互相进行类型断言了
```
interface Animal{
    name:string
}
interface Cat {
    name:string,
    run():void
}
function who(a:Animal){
    return (a as Cat).name = "这是啥"
}
function who2(a:Cat){
    return (a as Animal).name = "这是一只猫"
}
```
* 虽然说断言是可以互相断言，但是赋值就不一样了，只能属性多的赋值给属性少的一方，反过来是会报错的
* 换句话说 多的Cat是可以附过去比较少的Dog，但是比较少的Dog不能反过来附到多的Cat身上
```
interface Cat {
    name:string, //Cat和Dog有相同的name属性限制，就可以实现兼容
    go():void
}
interface Dog {
    name:string
}
let num : Cat = {
    name:"张飞",
    go(){
        console.log("这是个啥")
    }
}
let animal : Dog = num //赋值的同时会把go方法也附过去，相当于继承一样
console.log(animal)	
```
* 在此基础上，如果双方都互相兼容对方，就可以实现互相兼容断言
* 也就是说，不单单可以赋值，甚至可以进行断言，只要有兼容的情况下
* 其中 any是可以被断言成任何类型的，任何类型也是可以被断言成any
```
interface Cat {
    name:string,
    go():void
}
interface Dog {
    name:string
}
function test(go:Cat){  
    return (go as Dog);  //可以直接兼容
}
function test2(go:Dog){
    return (go as Cat)
}
```
* 然后这就引申出第三个问题，如果说我想要断言两个不兼容的情况 是不是可以通过一个any来实现双重断言
* 切记 切记 切记 这个方法很容易发生运行错误，所以一般不要用双重断言
```
interface Cat {
    go():void
}
interface Dog {
    name:string
}
function test(go:Cat){
    return (go as any as Dog);
}
function test2(go:Dog){
    return (go as any as Cat)
}
```
#### 声明语句
* 在引入第三方库的时候，需要多一步，引入相应的声明文件才能正常使用第三方庫
* 例如引入jquery库的时候，用script标签进行引入，然后就直接使用$()来指定
* 这个时候ts是无法识别的，所以需要加多一步来识别这个$符号
```
declare var $:(selector:string)=>any;
//然后就可以正常使用这个$符号了
$("#id")
```
* 通常会把类似的声明语句放在一个单独的文件中，jquery.d.ts中，这就是声明文件
* 声明文件一定要以.d.ts做后缀，这样才能识别为ts文件
* 一般来说，ts能够解析.ts结尾的文件所以也能识别.d.ts结尾的文件，所以一般文件的结构会想下面一样
```
/path/to/project
├── src
|  ├── index.ts
|  └── jQuery.d.ts
└── tsconfig.json
```
* 假如仍然无法解析，那么可以检查下 tsconfig.json 中的 files、include 和 exclude 配置，确保其包含了 jQuery.d.ts 文件。
* 有很多时候，公用的第三方包已经被社区定义好了，其实我们有时候使用Npm下载下来就可以了
* 所以官方更推荐使用@type来统一管理第三方包
* 使用@type的方式很简单，直接使用npm安装对应的声明模块即可，以jquery举例
* 可以在这个页面搜索需要的声明文件：[](https://microsoft.github.io/TypeSearch/)
```
npm install @types/jquery --save-dev
```
* 然后在文件中进行引入即可
```
npm 包：通过 import foo from 'foo' 导入，符合 ES6 模块规范
```
* 另外就是结合ES6的声明方式:declare const 和 declare let 这两个方式和const和let有相同特性就不一一展开了
* 要说的是声明函数 declare function ，这里由于jquery也是方法，所以也能使用这种方式来进行声明
```
declare function $(select:string):any
```
* 当全局变量是一个类的时候，我们可以使用declare class来定义他的类型
* 但是注意，这个也只是用来定义类型，不能用来实现类型
```
declare class Animal {
    name: string;
    constructor(name: string);
    sayHi() {
        return `My name is ${this.name}`;  //这里用来实现类型就会报错
    };
    // ERROR: An implementation cannot be declared in ambient contexts.
}
```
* 当需要设置一个内部的空间，而不是简单的全局变量污染全局，我们可以设置一个namespace命名空间
* 这里假设jquery里面有一个ajax方法可以调用则可以这样声明
```
// src/jQuery.d.ts

declare namespace jQuery {
    function ajax(url: string, settings?: any): void;
}
```
* 当使用起来的时候就是直接.接后面的方法即可
```
// src/index.ts

jQuery.ajax("/api/get_something")
```
* 这个命名空间还可以防止interface或者type的命名冲突，把他们放置在namespace下面就能有效避免这个问题
```
// src/jQuery.d.ts
declare namespace jQuery {
	interface Ajax {
		method?:"POST"|"GET",
		data?:any
	}
}
```
* 在使用的时候记得在前面加上命名空间的名字
```
jQuery.Ajax()
```
* 假设jQuery既是一个函数，也有自己的子属性ajax可以供调用，那么我们也可以组合多个声明语句，他们并不会冲突
```
// src/jQuery.d.ts
declare function jQuery(selector:string):any;
declare namespace jQuery{
	function ajax(url:string,setting?:any):void
}

// src/index.ts
jQuery('#foo');
jQuery.ajax('/api/get_something');
```
* TypeScript的另类用法：元组
* 简单来理解就是定义了数组的每一个值的类型
```
let num :[string,number] = ["123",123]

//注意 这个数量是不能变的 要保持一致
let num :[string,number] = ["123"]  //这样是会报错的
```
* 也可以单独拿出来
```
let tom: [string, number];
tom[0] = 'Tom';
tom[1] = 25;

tom[0].slice(1);
tom[1].toFixed(2);
```