## React
#### 三个特点
* 声明式：相比jquery的命令式是相对的，是更加面向对象的编程方式
* 组件化：组件化最大的好处是能够进行复用和更好的维护
* 一次学习，随处编写：能够进行react ReactNative 原生的开发
#### 下载cnpm i babel-standalone -S     能让ES6转成ES5 然后可以让render识别HTML标签
#### 安装顺序
* 首先搭建一个pack.json： npm init -y (-y是省略掉后面的内容)
* 然后下载通用型react ： cnpm i react -S (然后在node_modules目录中找到react-is@16.12.0@react-is目录，拷贝umd目录下的react-is.development.js)
* 然后再下载用于web开发的react包 : cnpm i react-dom -S (然后也是找到umd目录下的react-dom.development.js)
* 然后为了让render能够渲染html标签 需要下载babel包
* 下载babel包代码：cnpm i babel-standalone -S (然后也是在node_modules目录下找到_babel-standalone@...拷贝babel.js)
* 然后引入顺序千万注意：1.引入react 2.引入react-dom 3.引入babel
* 当三个文件引入到html文件中后,script标签的type一定要指定为text/babel才能使用
* babel的作用是将ES6语法转换成ES5语法,还有解析jsx语法也就是react语法
```

<div id="app"></div>
<script type="text/babel"> //切记要把type改为babel 不然无法在js里面解析html
	...jsx语法
	var a = <h2>hello,world</h2>
	ReactDOM.render(
		a,
		document.getElementById("app")
	)
</script>
```
#### jsx是一种语法糖
* jsx是javascript扩展的意思,相当于是js+xml
* jsx不是必须的，但是用Jsx可以提高开发效率
* jsx原理就是 React.creatElement("标签",{属性:xxx},"标签里的内容")
* jsx 差值表达式是在一个{}里面,但是对象不能直接渲染,需要加上后面的属性值，但是数组可以直接渲染连在一块 
* jsx 语法能让html标签出现在js文件里面，并且能够渲染
```
<div id="app"></div>
    <script type="text/babel"> //记得把这个改为babel
        var a = ["aa","bb","cc"];
        var node = <p 
        className="only"    //绑定class属性需要加上className 因为毕竟不是真的html标签是Jsx语法
        style={{"backgroundColor":"red"}}  //绑定style需要在外面加上{}，类似vue里面的v-bind，也是jsx语法
        onClick={()=>{alert("测试一下")}}  //绑定函数的时候后面那个字母要大写
        >测试标签</p>
        ReactDOM.render(
            <div>
                {node}
                {a}  //数组也是可以渲染的,渲染出来的是所有的值连在一起，附对象是无法渲染的
            </div>,
            document.getElementById("app")
        )
    </script>
```
```
var a = {a:1,b:2}
ReactDOM
```
* 注意jsx中变量使用class要改为className不然会报错,然后绑定事件一定要大写onClick
* 当jsx绑定style的时候需要用{}里面填充
* jsx中不能写语句:if语句 for语句等,但是能够执行函数

#### 下午:1.遍历列表 2.组件 3.遍历对象
* 因为在{}里面无法使用for循环语句 所以无法使用for循环像vue一样遍历数组
* 但是在{}里面可以使用函数map 也能遍历数组
* 但是注意 使用map循环的时候也要像vue的v-for一样使用key值
* 同样的，相比于vue的v-for循环，React要更加灵活，下面是循环列表的常用两种方式，map和for循环实现列表循环
* 注意 函数里面return 那一行不能有空格必须接上ul或者其他 所以就导致函数外面不能换行
```
<div id="app"></div>
    <script type="text/babel">
        var arr = ["aa","bb","cc"];
        var lessons = ["jj","gg","bb"];
        function showList (arr){   //第一种利用了map函数进行循环更加简便了操作
            return (  //千万注意：这个括号是为了下面的函数能够换行 让整体更加美观，如果没有这个括号就无法换行
                <ul>
                    {
                        arr.map((item,index)=>
                            <li key={index}>{item}</li>
                        )
                    }    
                </ul>
            )
        }
        function showList2 (arr){  //第二种是使用原生的for循环也能实现同样的效果
            var temArr = [];
            for(var i = 0;i<arr.length;i++){
                temArr.push(
                    <li key={i}>{arr[i]}</li>
                )
            }
            return (
                <ul>
                    {temArr}
                </ul>
            )
        }
        ReactDOM.render(
            <div>
                {
                    showList(arr)
                }
                {
                    showList2(lessons)
                }
            </div>,
            document.getElementById("app")
        )
    </script>
```
* 如果想在循环里面使用判断语句，实现tab切换功能，最方便的就是使用三目运算符
* 使用React做tab切换的时候注意要封装一个render的渲染函数，再更新了数值之后重新渲染
```
<div id="app"></div>
    <script type="text/babel">
        var arr = ["aa", "bb", "cc"];
        var arrIndex = 0;   //先设置一个参数作为tab切换的参考
        function showList(arr) {
            return (
                <ul>
                    {
                        arr.map((item, index) =>
                            <li
                                key={index}
                                style={{ "color": index == arrIndex ? "#f40" : "#000" }} //因为在循环里无法使用if所以使用三目运算符做判断
                                onClick={() => {
                                    arrIndex = index;
                                    render()  //当点击之后数值发生更改需要重新渲染才能改变页面
                                }}
                            >{item}</li>
                        )
                    }
                </ul>
            )
        }
        function render() {  //提前封装好一个render函数作为渲染
            ReactDOM.render(
                <div>
                    {
                        showList(arr)
                    }
                </div>,
                document.getElementById("app")
            )
        }
        render();  //一开始先使用render函数渲染一遍
```
* 同理，不单单可以使用绑定style修改tab样式,还可以用className修改样式
```
<li
    key={index}
    className={index == arrIndex?"only":""}  //用className同样能修改样式
    onClick={() => {
    arrIndex = index;
    render()
    }}
>{item}</li>
```
* 组件化思想，父组件传值给子组件的时候和vue差不多，但是React是用{}号传过去，然后子组件也是用props接收
* 下面代码实现点击父组件的标签，切换子组件显示和隐藏，子组件的列表是由父组件传递过去的数组实现的
```
<div id="app"></div>
    <script type="text/babel">
        var goods = ["草莓","N95口罩","防护服","双黄连口服液"];
        var showList = false
        var List = (props)=>{  //子组件使用props接收父组件传递过来的参数
            return (
                <ul style={{"display":showList?"block":"none"}}>
                    {
                        props.getArr.map((item,index)=>{  //使用方法也很简单，直接使用props.xxx(传递过来的名字)
                            return <li key={index}>{item}</li>
                        })
                    }    
                </ul>
            )
        }
        //无状态组件 值没有state的组件，用于复用
        var App = ()=>{
            return (
                <div>
                    <h2 onClick={()=>{showList = !showList;render()}}>点击获取紧缺物资</h2>
                    <List getArr={goods} /> //父组件传递给子组件的值也和vue差不多，也是右边是父组件名字，左边是子组件名字
                </div>
            )
        }
        function render (){
            ReactDOM.render(
                <App />,  //可以直接用单标签组件表示上面的var App
                document.getElementById("app")
            )
        }
        render();
    </script>
```
* 组件分两种：1.无状态组件 2.类组件  其中类组件是es6新语法，更像面向对象的编程方式
```
//无状态组件比较简单没有其他设置
const 组件名字 = (props)=>{
	return jsx表达式
}

//类组件会稍微复杂一点，但是更符合面向对象的编程思路;
class 组件名字 extends React.Component{
	render(){
		//this 常用属性 state props refs
		//this.state 是组件内部的数据  this.props 是父组件传递过来的值 this.refs 用于标识一个节点
		return jsx表达式
	}
}
```
* 类组件实现上面的父组件传递数组给子组件进行渲染，并且父组件标签控制子组件是否正常显示
* extends继承的是方法不是属性,属性还得用props继承
```
<div id="app"></div>
    <script type="text/babel">
        var goods = ["草莓","N95口罩","防护服","双黄连口服液"];
        var showList = false;
        class List extends React.Component{   //类的运用，React.Component
            render(){  //类组件里面一定需要用到render()方法，但是里面不放porps 直接使用this.props即可
                return (
                    <ul style={{"display":showList?"block":"none"}}>
                        {
                            this.props.getList.map((item,index)=>{ //直接使用this.props就能获取到父级传过来的参数
                                return (
                                    <li key={index}>{item}</li>
                                )
                            })
                        }
                    </ul>
                )
            }
        }
        class App extends React.Component{
            render(){
                return (
                    <div>
                        <h2 onClick={()=>{showList=!showList;render()}}>点击获取紧缺物资</h2>
                        <List getList={goods}/>    //父组件传值也是一样的
                    </div>
                )
            }
        }
        function render(){
            ReactDOM.render(
                <App />,
                document.getElementById("app")
            )
        }
        render()
    </script>
```
* 因为对象不能直接被渲染，所以要用Object.keys()获取到对象的key值,然后通过这个es6的API遍历对象即可
* 注意：在获取对象的value值时，要使用obj[key]的形式
* 扩展：Object.values()能获取对象的value值 Object.entries()能返回key值和value值
```
<div id="app"></div>
    <script type="text/babel">
        var obj2 = {"手套":"23个","防护服":"45个","电动车":"2台"}
        var List = (props)=>{
            return (
                <ul>
                    {
                        Object.keys(props.obj).map((item,index)=>{ //使用Object.keys将对象变成数组之后再遍历
                            return (
                                <li key={index}>{item}:{props.obj[item]}</li> //注意：在获取对象的value值时，要使用obj[key]的形式
                            )
                        })
                    }    
                </ul>
            )
        }
        var App = ()=>{
            return (
                <div>
                    <h2>获取紧缺物资</h2>
                    <List obj={obj2} />    
                </div>
            )
        }
        function render(){
            ReactDOM.render(
                <App />,
                document.getElementById("app")
            )
        }
        render()
    </script>
```
#### 深拷贝和浅拷贝：浅拷贝指的是只拷贝第一层，里面的对象没有对象了
* 深拷贝指的是拷贝多层，拷贝了第一层之后下面还有第二层对象
* 对象的浅拷贝方式有两种 {...obj} 还有Object.assign({},obj)
```
<script>
        var obj = {aa:123,bb:234,cc:345}
        // var obj2 = {...obj}  //这一种方式是利用ES6的扩展运算符...实现浅拷贝
        var obj2 = Object.assign({},obj) //这一种方式是通过对象合并的方式，将后面的对象合并到一个新对象中也能实现浅拷贝
        obj2.aa = "更改一下文件"
        console.log(obj2,obj)
    </script>
```
* 在jsx中的注释是 { /* 注释的内容 */ }
```
//一般在jsx中的注释不能用简单的//不然会报错
{ /* 注释内容 */ }
```
#### 类组件的三个重要属性：this.state this.props this.ref
* ref标识节点有两种方法:1.在jsx的html中写入ref="xxx" 然后在js中使用this.refs.xxx就能获取节点
*                    2.在jsx的html中写入ref={(cur)=>this.xxx=cur} 然后在js中使用this.xxx即可找到节点了 (其中ref中的cur就表示当前节点)
* 第二种方式是官方推荐的,第二种方式中的第一个形参就是指节点本身，会更加优雅
* React生命周期componentDidMount() 相当于vue的mounted
```
<div id="app"></div>
    <script type="text/babel">
        class App extends React.Component{
            componentDidMount(){
                console.log(this.refs.test)
                console.log(this.xx)
            }
            render(){
                return (
                    <div>
                        <h2 ref="test">测试一下能不能获取ref</h2>   //第一种方式稍微繁琐一点
                        <h3 ref={(cur)=>this.xx=cur}>测试第二种方式能不能获取到元素节点</h3> //第二种方式会更加优雅
                    </div>
                )
            }
        }
        ReactDOM.render(
            <App />,
            document.getElementById("app")
        )
    </script>
```
* 构造器里面的super是将父级的constructor里面的属性传递过来
#### state状态: 第一行一定要写super()
```
constructor(props){
	super(props); //里面的props是为了this.props里面有值
	this.state = {
		key:value
	}
}
```
* 更改state需要用this.setState({}),因为如果直接用this.state.xxx修改不会触发自动渲染
* 但是this.setState()能够在更改值的同时能够自动渲染,并且setState是一个异步的方法
* 并且在使用this.setState的时候后面可以加一个回调函数callback
```
this.setState({
	key:新的value值
},callback)

<div id="app"></div>
    <script type="text/babel"> 
        class App extends React.Component{
            constructor(props){
                super(props);
                this.state = {
                    num : "测试一下未更改之前",
                    change : this.change.bind(this) //在绑定事件方法的时候也绑在state里面使用起来会更优雅
                }
            }
            change(){
                this.setState({num:"wow!被修改了"}  //不能直接修改，需要用到this.setState({})
				,()=>{
					alert("测试一下callback")  // this.setState后面可以再接一个回调函数callback
				})  
            }
            render(){
                let {num,change} = this.state;  //注意记得要解构赋值
                return (
                    <div>
                        {
                            <h2 onClick={change}>{num}</h2> //点击事件因为绑定在了state上面看上去更加优雅了
                        }    
                    </div>
                )
            }
        }
        ReactDOM.render(
            <App />,
            document.getElementById("app")
        )
    </script>
```
* 这里需要注意更改state的setState有两种方式设置：第一种方式setState({})在连续执行的时候会进行合并，最后一次调用会覆盖前面的
* 但是第二种方式就能规避这个问题：setState()里面还可以接函数
```
//使用这种方法可以当setState连续执行的时候会按照顺序执行,就不会合并了
this.setState((prevState,props)=>{  //其中prevState表示上一次执行的状态
	return {
		key:prevState.xxx + 1  
	}
},callback)
```
* 当多次调用的时候就可以实现多重触发，并且不会合并
```
<div id="app"></div>
    <script type="text/babel"> 
        class App extends React.Component{
            constructor(props){
                super(props);
                this.state = {
                    num : 0
                }
            }
            change=(p)=>{
                this.setState((prevState,props)=>{   //当多次调用的时候利用prevState获取上一次的状态就能多次触发
                    return {
                        num : prevState.num + p
                    }
                })
                this.setState((prevState,props)=>{
                    return {
                        num : prevState.num + p
                    }
                })
            }
            render(){
                let {num} = this.state
                return (
                    <div>
                        <button onClick={this.change.bind(this,1)}>+</button>
                        <h3>{num}</h3>
                        <button onClick={this.change.bind(this,-1)}>-</button>
                    </div>
                )
            }
        }
        ReactDOM.render(
            <App />,
            document.getElementById("app")
        )
    </script>
```
#### ES6语法类与继承中的super用法
* 当需要修改父级继承过来的方法时，并且在修改的过程中需要用到父级的同名方法可以用super.xxx()进行区分使用
```
<div id="app"></div>
    <script type="text/babel">
        class Person {
            constructor(name,age){
                this.name = name;
                this.age = age;
            }
            say(){
                return this.name+":"+this.age
            }
        }
        var person = new Person("张飞","谁能挡我")
        class Children extends Person{
            constructor(name,age,school){
                super(name,age);  //继承Person的属性需要加上参数
                this.school = school;
            }
            say(){  //如果说想要修改父级继承过来的方法，直接用相同的名字的函数即可
                return super.say() + ":来将出自" + this.school  //如果说在相同名字的函数中想要调用父级的方法 就要用到super.say()即可
            }
        }
        var children = new Children("赵云","枪出如龙","蜀国")
        console.log(children.say())
    </script>
```
* shouldComponentUpdate的返回值可以控制组件能否重新渲染 提高React性能
#### ES5的构造函数方法 和 ES6的构造函数方法 对比
* ES5的构造函数属性是放在函数里面，但是方法是放在原型上面
* ES5 在构造函数相互继承之间需要设置很多问题:
* 例如方法要通过原型继承使用ES6语法Object.create()进行再拷贝,然后将从父级继承过来的方法constructor指向指回自身
* 属性则是直接实例化即可
* 注意：如果子组件想要用同名函数覆盖父组件的函数，并且在子组件函数中使用父组件的函数则麻烦点:
* Person.prototype.say.call(this) 可以使用父类的方法同名的
* ES5的方法:
```
function Person(name,age){  //ES5的构造函数里面属性是放在函数里面 方法则放在原型上
    this.name = name;
    this.age = age;
}
Person.prototype.say=function(){  //ES5的方法是放在原型上的
    return this.name+','+this.age;
}
var p = new Person("zs",15);

function Student(name,age,school){ //如果需要继承父级的属性则需要把形参全部加进去
    Person.call(this,name,age); //然后将父级的构造函数this指向转换为这里的this就能实现继承属性
    this.school = school;
}
Student.prototype = Object.create(Person.prototype); //继承父级的方法则使用ES6的新语法Object.create()浅拷贝即可

Student.prototype.constructor= Student; //注意 ：这一步是为了将从父级原型上继承过来的方法的constructor指向回归成实例化的Student

Student.prototype.say=function(){
    return Person.prototype.say.call(this)+","+this.school; //在子组件中同名函数使用父组件方法
}
var s = new Student("zs","15","千锋")
console.log(s.say())
```
* ES6的构造函数方法就会简便很多：
* 其中方法的constructor也不需要手动指回自己的子级
```
class Person {
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    say(){   //Person.prototype
        return this.name+','+this.age;
    }
}
class Student extends Person {
    constructor(name,age,school){
        super(name,age); //替代了ES5中繁琐的操作,直接用super继承属性
        this.school = school 
    }
    say(){
        return super.say()+","+this.school;
    }
}
var s = new Student("ls",20,"qf");

console.log(s.say());
```
#### React绑定事件的两种方式:this.xxx.bind(this,y)
* 因为如果直接在jsx的html文件上绑定事件会导致this无法正确指向，所以绑定事件函数一定要把this的指向更改回来
* 第一种方式是通过bind改变this指向,下面这种方式是绑定在state上面更加优雅
```
constructor(props){
	super(props);
	this.state = {
		num : "测试",
		change : this.change.bind(this) //先将事件函数绑定在state状态上
	}
}
change(){
	alert("xxx")
}
render(){
	let {num,change} = this.state //然后再在最上面进行解构赋值
	return (
		<div>
			<h2 onClick={change}>  //这样一来绑定事件函数的时候就非常方便了
				{num}
			</h2>
		</div>
	)
}
```
* 第二种方式是直接使用ES6的箭头函数，这样this的指向就不会发生改变了
```
change = ()=>{
	alert("测试一下")
}
render(){
	return (
		<div>
			<h2 onClick={this.change}>  //这样一来绑定事件函数的时候就非常方便了
				{num}
			</h2>
		</div>
	)
}
```
* 事件对象并不像vue一样用$event,而是最后一个多出来的形参就是事件对象，
```

```
#### render() componentDidMount constructor的执行次序
* constructor最优先 其次为render 最后是componentDidMount
#### 受控组件和非受控组件的区别：表单元素的值来自state 这个组件就是受控组件 否则就是非受控组件
* 对于普通组件来说，组件的数据都来自于外部(props)这个组件就是受控组件
* 受控表单元素input比较特别,使用<input />单标签,在标签内加入value值就能控制input内的内容,但是会报错
* 解决办法有两个(推荐使用第二个):1.就是将value改为defaultValue,但是这样一来input就变成非受控状态了
```
<div id="app"></div>
    <script type="text/babel">    
        class App extends React.Component{
            constructor(props){
                super(props);
                this.state = {

                }
            }
            render(){
                return (
                    <div>
                        <input value="测试" />  //这个时候已经能够控制表单了 input里面的值无法更改 但是会报错
						<input defaultValue="测试" /> //虽然能够修改表单 但是input就变为非受控表单了
                    </div>
                )
            }
        }
        ReactDOM.render(
            <App />,
            document.getElementById("app")
        )
    </script>
```
* 2.还是使用value,但是加入一个onChange事件进行控制,并且value值要绑定一个this.state里面的属性值
* 然后实现的效果就类似于vue的v-model一样,实现双向绑定
```
<div id="app"></div>
    <script type="text/babel">    
        class App extends React.Component{
            constructor(props){
                super(props);
                this.state = {
                    num : "测试"  // 先在state里面设置一个input框的值
                }
            }
            change=(e)=>{
                this.setState({
                    num : e.target.value //change事件时刻更改state里面的值
                })
            }
            render(){
                return (
                    <div>
                        <input value={this.state.num} onChange={this.change} /> //这就是一个完整的受控表单了
                    </div>
                )
            }
        }
        ReactDOM.render(
            <App />,
            document.getElementById("app")
        )
    </script>
```
#### 利用onkeyUp事件做简单的聊天发送功能
* 其中使用num:[this.node.value,...this.state.num] 更新状态中的num值会更加优雅，而且能控制加入的值是在原有基础上的前面还是后面加入
* 其中e.target.value和this.ref.value 获取的值是一样的
```
<div id="app"></div>
    <script type="text/babel">    
        class App extends React.Component{
            constructor(props){
                super(props);
                this.state = {
                    num : []
                }
            }
            changenum=(e)=>{
                console.log(e.target.value)  //也可以用事件对象获取dom
                console.log(this.node.value)
                if(e.keyCode == 13){
                    this.setState({
                        num:[this.node.value,...this.state.num]  //更新数列的方式用扩展运算符，能够让代码更加优雅
                    },()=>{
                        this.node.value = "" //最后用回调函数清空input框
                    })
                }
            }
            render(){
                let {num} = this.state 
                return (
                    <div>
                        <input onKeyUp={this.changenum} ref={(node)=>this.node=node}/>
                        <ul>
                            {
                                num.map((item,index)=>{
                                    return (
                                        <li key={index}>{item}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                )
            }
        }
        ReactDOM.render(
            <App />,
            document.getElementById("app")
        )
    </script>
```
#### 聊天功能的增删改查
* 引入了两个js的弹出框功能: 1.confirm("xxx") 你确定xxx吗？ 返回值为布尔类型的
* 2.prompt("xxx","yyy") xxx为弹出框的主体  yyy为弹出框的内容并且是可以修改的  返回值为修改后的值
* 查找字符串 includes 方法 判断是否含有子串 用(indexOf也行)
* 字符串替换方法replace(new RegExp("需要查找的字符串值","g"),"替换的内容") //其中"g"代表全局查找
* <div dangerouslySetInnerHTML={{__html:item}}></div> 方法能够让动态传值的时候识别html标签
* 甚至是数组里面含有html标签，也能通过上面的方法识别出来
```
<div id="app"></div>
    <script type="text/babel">    
        class App extends React.Component{
            constructor(props){
                super(props);
                this.state = {
                    list : [],
                    arr : [],
                    showList : false
                }
            }

            //增加对话
            change=(e)=>{
                if(this.inp.value == "") return 
                if(e.keyCode == 13){
                    this.setState({
                        list:[this.inp.value,...this.state.list]
                    },()=>{
                        this.inp.value = ""
                    })
                }
            }
            //删除对话
            remove=(index)=>{
                let {list} = this.state
                if(confirm("你确定要删除吗")){
                    this.setState({
                        list:list.filter((item,idx)=>{
                            if(list.length != 1){
                                return idx == list.length - index - 1
                            }else{
                                return 0
                            }
                        })
                    })
                }
            }
            //修改对话
            modeif(index){
                let {list} = this.state
                let pro = prompt("修改",list[index])
                if(pro){
                    list[index] = pro
                }
                this.setState({
                    list
                })
            }
            //查找功能，并且高亮样式
            blurFind(){
				//获取关键字
                let keyword = prompt("查找","请输入关键字")
				//然后将含有关键字的数组中的值重新筛选成一个数组
                let newlist = this.state.list.filter((item,index)=>item.includes(keyword))
                //高亮样式
                newlist.forEach((item,idx,arr)=>{
					//设置高亮样式，需要重新将Html标签塞进数组里面进行渲染
                    arr[idx] = item.replace(new RegExp(keyword,"g"),"<span style='color:red'>"+keyword+"</span>")
                })
                this.setState({
                    arr : [...newlist],
                    showList : true
                })
            }
            //返回按钮
            goBack(){
                this.setState({
                    arr : [],
                    showList : false
                })
            }

            render(){
                let {list,arr} = this.state
                return (
                    <div>
                        <input type="text" onKeyUp={this.change} ref={(cur)=>this.inp=cur} />
                        <button onClick={this.blurFind.bind(this)}>查找</button>
                        <button onClick={this.goBack.bind(this)} style={{"display":this.state.showList?"block":"none"}}>返回</button>
                        <ul style={{"display":!this.state.showList?"block":"none"}}>
                            {
                                list.map((item,index)=>{
                                    return (
                                        <li key={index}>
                                        {item}
                                        <button onClick={this.remove.bind(this,index)}>删除</button>{/*注意 这里不能用this.remove(index) 因为用这个的话会直接执行这个函数*/}
                                        <button onClick={this.modeif.bind(this,index)}>修改</button>
                                        </li>
                                    )
                                })
                            }
                            
                        </ul>
                        <ul style={{"display":this.state.showList?"block":"none"}}>
                            {
                                arr.map((item,index)=>{
                                    return (
                                        <li key={index}>
											//为了能让数组也渲染html文件 需要加上下面的属性
                                            <span dangerouslySetInnerHTML={{__html:item}}></span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                )
            }
        }
        ReactDOM.render(
            <App />,
            document.getElementById("app")
        )
    </script>
```
* vsCode 插件 Live server 能够自动热更新
* 为什么html,css,js都不分离了:1.组件卸载的时候，事件也卸载了，不会导致内存泄漏
* 2.所有的事件监听都挂在顶层
#### React脚手架环境：先安装 cnpm install -g create-react-app
* 测试是否安装好 ：create-react-app --version  能看到版本号 说明安装成功
* 用脚手架创建一个项目: create-react-app your-app
* 启动项目 npm start或者(yarn start)
* PWA能在离线的时候保留内容
* ES6的导入和导出
```
//当多个导出的时候
export xxx
export yyy
//可以用一下方法全部导入
import * as 名字 from "路径"
```
* ES6引入图片的方式有两种:
```
//第一种
import 变量 from "图片的路径"
<img src={变量} />
//第二种
<img src={require("图片的路径")} />
```
* 如果脚手架安装失败，下载压缩包 安装依赖 npm install
* yarn安装：https://classic.yarnpkg.com/latest.msi
#### 脚手架
* es7插件(ES7 React/Redux/GraphQL/React-Native snippets)  rcc 就能出来类组件 rfc 就是无状态组件
* 先建一个目录文件夹components 然后再创建一个组件文件夹one 里面放一个index.js文件做组件文件 因为名字是Index
* 所以在app引入的时候不用写index.js 直接引导one就可以了
* input defaultchecked 才能修改复选框 这是jsx的语法规则
* lable标签中 在react里面也要加一个属性 htmlFor="input框的id名"
```
render() {
        return (
            <div>
                <label htmlFor="inp">测试点击</label>
                <input type="text" id="inp" />
            </div>
        )
    }
```
* ref的第三种用法:
```
import React,{} from "react"  //先引进
constructor(props){
	super(props);
	this.state = {
		node: createRef() //然后创建一个节点 下一步就是在节点上贴上去即可
	}
}
render(){
	return (
		node ref={this.state.node}
	)
}
引用这个节点的方式
	this.state.node.current 就可以引用这个节点了
```
#### 组件之间传值
* 父组件传值给子组件是通过props
* 子组件传值给父组件是通过函数传值 调用父组件传递过来的方法来实现 传递参数过去this.props.xxx(传值)
```
//父组件传值过去通过一个函数 例如下面的add()
constructor(props){
        super(props);
        this.state = {
            list:[],
            add:this.add.bind(this)
        }
    }
    add(value){ //父组件通过形参获取子组件传递过来的值
        this.setState({
            list:[...this.state.list,value]
        })
    }
    render() {
        let {list,add} = this.state
        return (
            <div>
                <Inp add={add}/> //将函数绑定在子组件上面传递过去
                <hr />
                <Txt list={list}/>
            </div>
        )
    }
//子组件之间通过传参调用传递给父组件参数
constructor(props){
        super(props);
        this.state = {
            enter:this.enter.bind(this)
        }
    }
    enter(e){
        let {add} = this.props
        if(e.keyCode == 13){
            add(this.inp.value)  //通过之间调用父组件传递过来的函数传参实现子组件给父组件传参
            this.inp.value = ""
        }
    }
    render() {
        
        let {enter} = this.state
        return (
            <div>
                <input type="text" ref={(cur)=>this.inp=cur} onKeyUp={enter} />
            </div>
        )
    }
```
* 解构赋值中的设置默认值
```
enter(e){
        let {add=()=>{}} = this.props //为了防止父组件没有传值过来报错，解构赋值的时候添加一个默认值
        if(e.keyCode == 13){
            add(this.inp.value)
            this.inp.value = ""
        }
    }
```
* 与服务器交互 componentDidMount之后调用接口使用AJAX请求
* mock的数据工具json-server 能模拟后端接口  安装: cnpm install json-server -g
* 输入json-server --version 能看到版本号就是安装成功
* 还要安装axios进行接口的调用  安装: cnpm install axios -S
* 然后在src的根目录下新建一个mock文件夹存放后台文件，可以新建一个data.json文件试试看
* 注意：因为json-server模拟后台服务器的时候默认使用的端口是3000，和React脚手架的端口号冲突，所以需要更改端口号才能用
```
//在mock文件夹下使用命令行输入:
json-server data.json --port 4000 -w //输入--port后面更改端口号,输入-w是能够实时监控，当json数据修改之后不用重启
```
* 怎么使用这个json-server呢
```
//json-server的使用说明网站：
https://gitee.com/rh_hg/json-server?_from=gitee_search
//json-server模糊查找有两种方式
//全局: url?q=查找的关键字
//以某一个字段进行查找 url?字段_like=关键字

1.获取数据：
axios.get("http://localhost:4000/list").then((res)=>{ //直接用get获取地址即可
            if(res.status===200){
                this.setState({
                    list:res.data
                })
            }
        })
2.给后台数据添加参数
axios.post("http://localhost:4000/list",{ //后面直接接要传的参数
            name,age
            },{
                "headers":{  //注意 一定要加上这个请求头
                    "Content-type":"application/json"
                }
            }).then(()=>{  //写入成功
                this.getData();  //再次请求新的数据
            })
```
* 非常重要的小技巧，当需要修改后端数据的时候，分别用不同的input框，但是可以只调用一个函数，不同函数的id也对应着
* 他们分别受控的value值，然后通过调用当前的id值来分别修改后端的数据
```
input(e){
        this.setState({
            [e.target.id]:e.target.value //其中e.target.id记得要加[]因为里面的值是变量
        })
    }
render(){
	return (
		<div>
			<input type="text" value={name} onChange={input} id="name" />
			<input type="number" value={age} onChange={input} id="age" />
		</div>
	)
}
```
#### 使用json-server调用后台接口实现todolist
* 调用confirm()的时候注意要使用window.confirm("你确定要xxx嘛"),不然指向会出错
```
import React, { Component } from 'react'
import axios from "axios"

export default class GetList extends Component {
    constructor(props){
        super(props);
        this.state={
            list:[],
            name:"",
            age:0,
            input:this.input.bind(this),
            config:this.config.bind(this),
        }
    }
    componentDidMount(){
        this.getlist()
    }
    //获取接口的列表
    getlist(){
        axios.get("http://localhost:4000/list").then((res)=>{
            if(res.status===200){
                this.setState({
                    list:res.data
                })
            }
        })
    }
    add(){
        let {name,age} = this.state
        if(this.state.name.trim() === "") return
        axios.post("http://localhost:4000/list",{
            name,age
        },{
            "headers":{
                "Content-type":"application/json"
            }
        }).then(()=>{
            this.getlist()
        })
        this.setState({
            name:"",
            age:0
        })
    }

    input(e){
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    config(e){
        if(e.keyCode === 13){
            this.add()
        }   
    }
	//删除功能
    remove(id){
        if(window.confirm("你确定要删除吗？")){
            axios.delete("http://localhost:4000/list/"+id).then((res)=>{
                if(res.status === 200){
                    this.getlist()
                }
            })
        }
    }
	//修改功能
    modify(item){
        let newList = prompt("修改内容",item.name+":"+item.age)
        let arr = newList.split(":")
        axios.patch("http://localhost:4000/list/"+item.id,{
            name:arr[0],
            age:arr[1]
        },{
            headers:{
                "content-type":"application/json"
            }
        }).then((res)=>{
            if(res.status === 200){
                this.getlist()
            }
        })
    }
	//查找功能
    search(){
        axios.get("http://localhost:4000/list?name_like="+this.state.name).then((res)=>{
            if(res.status === 200){
                this.setState({
                    list:res.data
                })
                // console.log(res)
            }
        })
    }
	//查找之后返回功能
    look(){
        this.getlist()
    }

    render() {
        let {name,list,input,age,config} = this.state
        return (
            <div>
                <input type="text" value={name} onChange={input}  id="name" onKeyUp={config}/>
                <input type="number" min="0" max="100" value={age}  onChange={input} id="age" onKeyUp={config}/>
                <button onClick={this.add.bind(this)}>提交</button>
                <hr/>
                <ul>
                    {
                        list.map((item,index)=>{
                        return <li key={index}>
                            {item.name}:{item.age}
                            <button onClick={this.remove.bind(this,item.id)}>删除</button>
                            <button onClick={this.modify.bind(this,item)}>修改</button>
                            </li>
                        })
                    }
                </ul>
                <button onClick={this.search.bind(this)}>查找</button>
                <button onClick={this.look.bind(this)}>浏览</button>
            </div>
        )
    }
}
```
*  要么写一个=号或者写===三个等号 因为写==会转换类型 不严谨
*  用组件的形式在写一次聊天todolist 调用后台接口json-server
#### 代理分两类：1.正向代理 (开发环境) 2.反向代理 (上线环境)
* 正向代理：是一个位于客户端和原始服务器之间的服务器，为了从原始服务器上获取内容，客户端先发送请求并指定原始服务器给代理服务器，
* 然后由代理服务器转交请求并返回内容给客户端，客户端必须指定代理服务器的IP地址和代理程序的端口号
```
//正向代理的用途
1.可以访问无法访问的地址 (例如google)
2.可以做缓存，加速访问资源
3.对客户端访问授权，上网验证
4.访问的网站不知道客户端的信息，取决于代理服务器告不告诉网站，保护客户端隐私
```
* 反向代理:和正向代理完全相反，客户端都不知道访问的是不是代理服务器，指的是客户端访问的是一个代理服务器，再由代理服务器将请求
* 转交给内部的服务器，并从内部服务器得到结果由代理服务器返回给客户端
```
//反向代理的作用
1.保护内网的安全，可以使用反向代理提供WAF功能，阻止web攻击(通常大型网站都会用反向代理)
2.负载均衡，通过反向代理来优化网站的负载
```
* React需要配置正向代理的时候，利用的是webpack的服务器，可以通过React cli的配置文件进行配置
* 配置文件的目录：项目目录下的/node_modules/react-scripts/config/webpackDevServer.config.js
```
//在webpackDevServer.config.js文件中进行配置，里面有一个叫proxy的属性，进行下面的配置
proxy:{
        "/weather":{  //当访问请求中含有这个字符的时候，代理服务器就会替换成下面target的网站
             target:"http://www.weather.com.cn",  //设置需要访问的网站
             changeOrigin:true, //设置跨域请求
             "pathRewrite":{
               "^/weather":"/"  //当访问以这个开头的时候会被替换成"/"
             }
        }
    },
```
* 然后调用这个正向代理的时候，直接将上面的字段加入网站即可
```
componentDidMount(){
        axios.get("/weather/data/cityinfo/101200101.html").then((res)=>{  //注意要改为"/weather"开头的才能触发正向代理
            console.log(res)
        })
    }
```
* 因为React的配置文件藏得太深了，所以为了解决这个问题，有第二个解决方案，就是将文件弹射到项目目录下
* 注意 注意 注意:之所以叫弹射，意思就是只要执行了这个命令，就无法返回，而且这个命令很容易报错
* 如果报错了，需要删除掉依赖包node_module重新npm install下载回来之后才能启动项目
* window的弹射指令:npm run eject
#### React的生命周期:
* 1.挂载阶段的四个生命周期函数
* (1)constructor (2)static getDerivedStateFromProps (3)componentDidMount (4)componentWillUnmount
```
constructor(props) //注意 constructor有第二个参数 是上下文

static getDerivedStateFromProps(props,state)
//就是为了更新派生的state，注意 这是个静态方法里面不能使用this
//就是子组件的this.state里的值是父组件的props传递过来的
//在组件实例化之后，和接收新的"props"后被调用，或者是父组件的props更新之后也会调用

render() //这个方法是必须的 会计算this.props和this.state

componentDidMount //可以再这里进行第三方库的初始化,可以获取真实的dom
```
```
//挂载阶段的是个钩子函数执行次序是
constructor
getDerivedStateFromProps
render
componentDidMount
//卸载阶段的钩子函数只有一个，将要卸载之前会触发，用于清除资源
componengtWillUnmount
```
* Derived State 派生状态 
* 当父组件的值发生改变，props过来的派生值也想改变就需要使用下面这个生命周期
* static getDerivedStateFromProps(props,state) 这是一个静态方法，是在class类上面的，动态方法指的是需要实例化才能使用的
* 静态方法不能使用this,动态方法才可以
```
//在父组件中设置一个state属性值
import React, { Component } from 'react'
import Derv from "../derv"

export default class One extends Component {
    constructor(props){
        super(props);
        this.state={
            num : 0
        }
        this.change = this.change.bind(this)
    }
    change(){
        this.setState({
            num:this.state.num + 1
        })
    }
    render() {
        let {num} = this.state
        return (
            <div>
                <Derv num={num} />
                <button onClick={this.change}>点击增加</button>
                <p>父组件:{num}</p>
            </div>
        )
    }
}
//然后在组组件Derv里面使用传递过去的props，并且赋值在自己的state上，叫做派生状态
import React, { Component } from 'react'

export default class derv extends Component {
    constructor(props){
        super(props);
        this.state={
            a:props.num  //这就是派生状态，如果仅仅是这个状态，父组件修改state.num，他是不会发生改变的
        }
    }
    static getDerivedStateFromProps(props,state){ //这个生命周期函数就是用来实时更改传递过来的派生属性的
        return {
            a:props.num //注意 这个是静态方法 ，所以是不能使用this的
        }
    }
    render() {
        let {a} = this.state
        return (
            <div>
                <h2>{a}</h2>
            </div>
        )
    }
}
```
* react已经把核心的算法给改了，因为组件之间嵌套的时候渲染很慢，现在是使用React Fiber
* 所以以前带Will的基本钩子函数就不能用了
* constructor只会执行一次
* 2.更新阶段的五个钩子函数
```
// 下面是五个钩子函数的执行次序
static getDerivedStateFromProps(props,state) //和上面的会重复，因为更新数据的时候也会触发并且还会比render要更早
shouldComponentUpdate(nextProps,nextState)
render()  //和上面的也会重复，因为更新数据的时候render也会触发
getSnapshotBeforeUpdate(prevProps,prevState)
componentDidUpdata(prevProps,prevState,snapshot)
```
* 其中shouldComponentUpdate(nextProps,nextState) 这个生命周期很特别
* 当列表循环需要多次渲染组件的时候，会造成很大程度的资源浪费，所以这个生命周期就能够有效的节约React性能
* 里面有两个参数代表更新数据之后拿到的最新的props和state，然后当这个函数返回true的时候该组件就会执行渲染，false就不会渲染
```
//假设父组件有一个列表需要多次渲染子组件
import React, { Component } from 'react'
import Item from "../item"

export default class Todos extends Component {
    constructor(props){
        super(props);
        this.state={
            list:[
                {
                    id:0,
                    name:"张飞",
                    flag:false
                },
                {
                    id:1,
                    name:"赵云",
                    flag:true
                },
                {
                    id:2,
                    name:"关羽",
                    flag:false
                },
            ],
        }
    }
    input(id){
        this.state.list[id].flag = !this.state.list[id].flag
        this.setState({
            list:this.state.list
        })
    }
    render() {
        let {list} = this.state
        console.log("renderBig")
        return (
            <div>
                <ul>
                    {
                        list.map((item,index)=>{
                            return <li key={index}>
                                <Item {...item} input={this.input.bind(this)} />  //需要多次渲染子组件，如果数据刷新就会重新渲染
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}
```
* 于此同时，如果子组件设置了shouldComponentUpdate()这个周期函数就不会多次渲染
```
import React, { Component } from 'react'

export default class Item extends Component {

    shouldComponentUpdate(nextProps){
        return nextProps.flag !== this.props.flag  //设置，当最新的props没有更新，就不会重新渲染
    }

    render() {
        let {name,flag,input,id} = this.props
        console.log("render")
        return (
            <div>
                <span>{name}</span>
                <input type="checkbox" checked={flag} onChange={input.bind(this,id)} />
            </div>
        )
    }
}
```
* 最后还有一个getSnapshotBeforeUpdate(prevProps,prevState)要和componentDidUpdate()搭配使用
* getSnapsshotBeforeUpdate是获取更新之前，然后componentDidUpdate是获取更新之后的状态，
```
	getSnapshotBeforeUpdate(prevProps,prevState){
        return 100
    }

    componentDidUpdate(prevProps,prevState,Snap){ //其中Snap参数能够获取到上面的更改之前的返回值
        console.log(Snap)
    }
```
* 3.卸载阶段就一个钩子函数:componentWillUnmount()
* 组件被卸载并销毁之前立刻被调用，此方法中执行任何必要的清理
* 例如：消除定时器，取消网络请求，清理任何在componentDidMount中创建的监听
* ReactDOM.unmountComponentAtNode(节点名)是一个方法，能卸载具体的挂载组件
```
import React, { Component } from 'react'
import ReactDOM from "react-dom"  //注意 如果需要使用卸载节点的方法需要引进这个

export default class derv extends Component {
    componentDidMount(){
        this.timer = setInterval(()=>{
            console.log(111)
        },1000)
    }
    onload(){
        ReactDOM.unmountComponentAtNode(document.getElementById("root")) //注意 root是React脚手架默认的节点
    }
    componentWillUnmount(){
        clearInterval(this.timer) //清理定时器
    }
    render() {
        return (
            <div>
                <button onClick={this.onload.bind(this)}>卸载组件</button>
            </div>
        )
    }
}
```
* 所以总的执行顺序就是以下方式
```
	constructor()
    static getDerivedStateFromProps (props,state)
    render()
    componentDidMount()

    static getDerivedStateFromProps (props,state)
    shouldComponentUpdate(nextProps,nextState)
    render()
    getSnapshotBeforeUpdate(pervProps,prevState)
    componentDidUpdate(prevPros,prevState,Snap)

    componentWillUnMount()

```
* 优化性能还能使用纯组件 进行浅对比，进行性能的优化
* React.memo()是无状态组件进行优化
* 我们把参数是组件，返回值也是组件 称为高阶组件
* 网络层 回话层 物理层 传输层

#### yarn和npm切换
* [yarn官网，实现npm切换至yarn](https://yarn.bootcss.com/docs/migrating-from-npm/)
* 直接用npm安装yarn：npm install yarn -g 
* 如果没有安装node.js会提示你进行安装
* 最后命令行输入yarn --version 看看有没有版本号出来，如果有版本号就是安装成功

#### React脚手架改端口号
* 脚手架自带的服务器是webpack-dev-server
* 更改脚手架的端口号，需要找到React的配置文件："node_modules/react-scripts/scripts/start.js"
```
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000; //默认是3000端口号，可以更改至其他的端口号
```
*  React脚手架中的confirm不能直接使用，因为ESlint的原因进行了禁用
*  React里面有一个空标记Fragment，因为render()属性是需要有一个标签做根标签的，所以Fragment可以做一个根标签之后被渲染出来就消失了
```
import React, { Component,Fragment } from 'react' //注意 如果要使用这个空标签是需要引入一个Fragment组件才能用

export default class Todos extends Component {
    render(){
        return (
            <Fragment>  
                <h1>第一行</h1>
                <h1>第二行</h1>
            </Fragment>
        )
    }
}
//或者因为Fragment本身就是一个空标签，也可以使用空标签表示Fragment
<></>
```
* 无状态组件只能渲染 没有this
* 父组件调用子组件的方法：this.refs.xxx.function
* map方法不会修改原数组，forEach(item,index,arr) 能用arr改变原数组
* class类里面是严格模式，所以当this指向不明确的时候就会返回undefined，所以当一个函数被赋值到另一个函数里面的时候
* 调用原函数的this就会返回undefined，而不是返回window
#### 如果父传值给子组件的时候，如果没有设置传值props的话，其实子组件也能给自己设置一个静态的props作为默认值
* 类似vue的props验证
* 使用static defaultProps即可调用
```
import React, { Component,Fragment } from 'react'

export default class Todos extends Component {
    static defaultProps={   //下面的属性可以直接使用this.props调用
        a:100
    }
    render(){
        return (
            <>
                <h2>{this.props.a}</h2>
            </>
        )
    }
}
```
* 上面的是类组件的静态方法调用，无状态组件也能有方法进行调用
```
var Todos = (props)=>{
    return (
        <h2>{props.a}</h2>
    )
}

Todos.defaultProps = {  //直接使用defaultProps即可
    a:100
}

export default Todos
```
* 但是，值可以先设置一个默认值，怎么判断props的数值类型呢，这就需要安装一个npm的包，这个包是React脚手架自带的不需要下载
* 但是需要引入: import {PropTypes} from "prop-types" ，并且可以设置是否是必须要传的，类似于vue一样
* prop-types的文档地址:[](https://www.npmjs.com/package/prop-types)
```
//传值过去的父组件必须要传子组件认证的类型，并且子组件还能通过isRequire检查是否需要这个值
import React, { Component ,Fragment} from 'react'
import Todos from "../todos"

export default class One extends Component {
    render() {
        return (
            <Fragment>
                <Todos a={666} />
            </Fragment>
        )
    }
}
//子组件就需要设置传过来的props验证
import React, { Component,Fragment } from 'react'
import {PropTypes} from "prop-types"

export default class Todos extends Component {
    static propTypes = {  //千万注意，这个静态属性的propTypes前面的p是小写，不然会报错
        a:PropTypes.number.isRequired //这里面的number指定的是数据类型，后面的isRequired表示是否一定要传，如果加上了就一定要传
    }
    render(){
        return (
            <>
                <h2>{this.props.a}</h2>
            </>
        )
    }
}
```
#### 在React脚手架中使用swiper
* 首先要引入swiper第三方插件:cnpm install swiper -S
* 然后只要在需要引入swiper的地方improt引入即可，注意还有css样式也需要加入
* 这里css有一个技巧，当需要引入的文件是在node_modules里面的时候，引入的时候可以不用写node_modules
* 注意需要在componentDidMount生命周期里实例化swiper
```
import React, { Component } from 'react'

import Swiper from "swiper"
import "swiper/css/swiper.css" //引入的时候直接可以省略node_modules

export default class One extends Component {
    componentDidMount(){
        new Swiper ('.swiper-container', {   //注意需要实例化swiper
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            autoplay:{
                delay:2000,
                disableOnInteraction: false, 
            },
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }
          })        
    }
    render() {
        return (
            <div>
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">Slide 1</div>
                        <div className="swiper-slide">Slide 2</div>
                        <div className="swiper-slide">Slide 3</div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        )
    }
}
```
* 但是如果是调用后台数据进行渲染的话，要涉及到一个异步传值的过程，因为要在swiper实例化之前获取到数据才能进行渲染
* 下面是将swiper实例化放在了componentDidUpdate()这个周期函数里面，当数据发生更新的时候就会重新实例化
* 然后在componentDidMount里面调用一次数据
```
import React, { Component } from 'react'
import Swiper from "swiper"
import "swiper/css/swiper.css"

export default class One extends Component {
    constructor(props){
        super(props);
        this.state={
            list:[]
        }
    }
    componentDidMount(){
          this.getMsg()
    }
    componentDidUpdate(){  
        new Swiper ('.swiper-container', {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            autoplay:{
                delay:2000,
                disableOnInteraction: false, 
            },
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }
          })     
    }
    getMsg(){
        fetch("http://localhost:4000/list").then((res)=>res.json()).then((res)=>{
            this.setState({
                list:res
            })
            console.log(res)
        })
    }
    render() {
        let {list} = this.state
        return (
            <div>
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {
                            list.map((res)=>{
                                return (
                                    <div key={res.bannerId} className="swiper-slide">{res.name}</div>
                                )
                            })
                        }
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        )
    }
}
```
* 或者可以有第二种方法，父组件负责获取数据，然后专门传给一个组件负责轮播图
* 这样就可以不使用componentDidUpdate这个生命周期，通过三目运算符即可
```
//父组件调取数据，通过this.state.list.length>0来设置是否给子组件数据
import React, { Component } from 'react'
import Myswiper from "../mySwiper"
export default class Two extends Component {
    constructor(props){
        super(props);
        this.state={
            list:[]
        }
    }
    componentDidMount(){
        this.getMsg()
    }
    getMsg(){
        fetch("http://localhost:4000/list").then((res)=>res.json()).then((res)=>{
            this.setState({
                list:res
            })
            console.log(res)
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.list.length > 0?
                    <Myswiper list={this.state.list}/>:""  //注意注意注意 这里就是精华
                }
            </div>
        )
    }
}
```
* 子组件只负责获取数据并渲染出轮播图即可
```
import React, { Component } from 'react'

import Swiper from "swiper"
import "swiper/css/swiper.css"

export default class Myswiper extends Component {

    componentDidMount(){
        new Swiper ('.swiper-container', {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            autoplay:{
                delay:2000,
                disableOnInteraction: false, 
            },
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }
        }) 
    }
    render() {
        let {list} = this.props
        return (
            <div>
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {
                            list.map((res)=>{
                                return (
                                    <div key={res.bannerId} className="swiper-slide">{res.name}</div>
                                )
                            })
                        }
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        )
    }
}
```
* 非父子组件之间传值可以用一个第三方插件:pubsub-js
* 如果需要使用需要先安装:cnpm install pubsub-js -S
* 然后在需要使用的组件上引入pubsub即可
```
//需要传值的组件需要使用PubSub.publish("xxx","传值")
import React, { Component } from 'react'
import PubSub from "pubsub-js"  //注意一定要引入这个插件
export default class Pub1 extends Component {
    send=()=>{
        PubSub.publish("evt","hello") //传的第一个参数是一个名字，让接受的组件识别，第二个参数才是传过去的值
    }
    render() {
        return (
            <div>
                <button onClick={this.send}>send</button>
            </div>
        )
    }
}
//需要接受这个值的组件要使用PubSub.subscribe("xxx",(msg,data)=>{})
import React, { Component } from 'react'
import PubSub from "pubsub-js"
export default class Pub2 extends Component {
    constructor(props){
        super(props)
        PubSub.subscribe("evt",(msg,data)=>{  //第一个参数是传过来的名字，第二个参数是一个函数 data才是返回值
            console.log(msg)
            console.log(data)
        })
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
```
#### react路由
* 首先安装路由:cnpm install react-router-dom -S
* 然后在index.js入口文件中引入router，并且用路由标签将App包裹起来
* 然后在Router标签内的组件都能够使用路由，因为react的context的缘故(后面会讲)
* 路由的两种模式:1.历史记录模式：BrowserRouter
*               2.Hash模式: HashRouter
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom" //在这里切换路由模式

ReactDOM.render(
    <Router>
        <App />
    </Router>
, document.getElementById('root'));
```
#### 在组件中使用Router路由的四个组件
* Route、NavLink、Redirect、Switch
* Route能将路由的内容展示出来，NavLink和Link基本功能一样，但是能够更加灵活的切换样式，自带一个.active的样式可以设置
* activeClassName可以更改.active为其他名称
* Redirect是将路由重另向，例如首页"/"重另向为其他的路由，实现一跳转首页就显示某个组件
* Switch的作用是当多个路由同时存在于Switch标签里面的时候只保留最后一个组件路由，用于跳转404页面
* 注意！React路由中是无法自己跳转404页面的，需要在Switch最后的位置设置一个404页面
```
import React from 'react';
import One from "./component/one"
import Two from "./component/two"
import './App.css';
import {Route,NavLink,Redirect,Switch,Link} from "react-router-dom"

var NotFound=()=>{
  return <div>404页面</div>
}

function App() {
  return (
    <div className="App">
      <NavLink to="/one" >one</NavLink>
      <NavLink to="/two" >two</NavLink>
      <Switch>
        <Route path="/one" component={One}></Route>
        <Route path="/two" component={Two}></Route>
        <Redirect from="/" to="/one" exact></Redirect>
        <Route component={NotFound}></Route>  //当前面的路由都没有匹配的时候就会跳转404页面
      </Switch>
    </div>
  );
}

export default App;
```
* public目录下的图片可以直接引用
#### sass需要安装两个包
* 安装: cnpm install sass-loader -S
* cnpm install node-sass -S
* 如果没有被Route嵌套的组件是没有路由切换的三个属性的，location match history
* 所以需要使用一个withRouter(组件名)
```
import {Route,NavLink,Switch,Redirect,withRouter} from "react-router-dom" //多引入一个withRouter

constructor(props){
	super(props)
	console.log(this.props)  //能发现多出来了Router的属性
}
...代码

export default withRouter(App) 然后最后抛出的时候用withRouter抛出即可，能在组件中使用this.props
```
#### 编程式路由
* this.props.history.listen((load)=>{console.log(load)})  //能监听路由
* 注意 使用这个监听的时候，如果刷新页面是不会重复触发监听事件的
* 所以需要手动给一个默认值
```
componentDidMount(){
    this.changeTitle(this.props.location.pathname)//解决刷新问题
    this.routerLis();
  }
  routerLis(){
    this.props.history.listen((load)=>{ 
      this.changeTitle(load.pathname)
    })
  }
```
* this.props.location.pathname 能获取当前的路由地址
```
console.log(this.props.location.pathname)
```
#### 路由传参的两种方式：1.this.props.match.params.xxx  2.this.props.location.state.xxx
* 第一种是通过地址传参，需要在Route上面加上/:xxx来标识，并且传递的参数会显示在路由上
* 用this.props.match.params.xxx 来接收
* 编程式路由和路由传参的方式:利用this.props.history.push()进行跳转
* 如果需要传递参数，需要在Route的path上面加上传参值
```
import React, { Component } from 'react'
import {Route,NavLink,Switch,Redirect,withRouter} from "react-router-dom"
import Push from "./components/push"

class App extends Component {
  getList(type){
    this.props.history.push("/push/"+type)  //直接用history.push进行传递
  }
  render() {
    return (
      <div>
        <button onClick={this.getList.bind(this,"goods")}>goods</button>
        <button onClick={this.getList.bind(this,"users")}>user</button>
        <Route path="/push/:type" component={Push}></Route>  //使用Route传递参数
      </div>
    )
  }
}

export default withRouter(App)
```
* 然后传递过去的参数使用this.props.match.params.xxx 接收即可
```
getList(){
        let num = this.props.match.params.type;  //直接用this.props.match取到参数
        axios.get("http://rap2api.taobao.org/app/mock/226329/api/"+num).then((res)=>{
            if(res.status === 200){
                this.setState({
                    list:res.data.data.list
                })
                console.log(res.data.data.list)
            }
        })
    }
```
* 如果是发送的请求字符串?a=111&b=222能不能取到呢，也是可以的用this.props.location.search取到
* this.props.location.pathname还能取到当前的路由信息
* 如果是请求字符串，可以用qs来解析，React脚手架也自带的 querystring
* 里面的parse能解析查询字符串，stringify能将数据变为查询字符串
* 但是记得要将前面的?号去除掉，使用slice(1)，从第二个序列开始算，全部截取之后返回
```
//父级组件路由传参，发送请求字符串
change(){
    this.props.history.push("/one/5566?a=23&b=54")
  }
//子级组件路由使用this.props.location.search截取到
import qs from "querystring"  //记得子组件要引入sq组件才能解析
componentDidMount(){
        let num = this.props.location.search.slice(1) //要把传过来的?号用slice去掉
        console.log(num)
        console.log(qs.parse(num))
    }
```
* 2.第二种是用this.props.location.state 也能编程传值
* 但是注意：params传值 默认值是{} state传值的默认值是undefined 所以需要设置一下判断state是否有值
* 而且用state的Route路由会非常的干净
```
//父级组件，使用this.props.history.push("/one",{xxx})
class App extends React.Component{
  change(type){
    this.props.history.push("/one",{type}) //注意 ，push的时候是用第二个参数里面的对象传参
  }
  render(){
    return (
      <div className="App">
        {/* <NavLink to="/one/coolman">跳转ONE</NavLink> */}
        <button onClick={this.change.bind(this,"users")}>跳转user</button>
        <button onClick={this.change.bind(this,"goods")}>跳转goods</button>
        <Route path="/one" component={One}></Route>
      </div>
    );
  }
}

export default withRouter(App);
```
* 然后子组件使用this.props.location.state进行接收
```
componentDidMount(){
	if(!this.props.location.state) return; //需要先进行判断是否state里面有值，因为默认是undefined
	let num = this.props.location.state.type
	console.log(num)
}
```
#### Redirect跳转的时候也能传递参数，但是如果说没有传参的话就不会显示，为此也有解决方法
```
<Redirect from="/test" to="/test/xxx" exact>
```
#### 新增特性：hook新特性 useState 能让无状态组件有状态
* 首先需要将useState引入才行
* let ["xxx",fun] = useState("ccc")
* 第一步将ccc赋值到xxx里面，fun是为了能够修改xxx的值存在的函数
* 第二步fun("aaa") 就能将xxx的值改为aaa
```
import React, { Component , useState} from 'react'//引入useState

var One = ()=>{
    var [type,changeType] = useState("5566") //只有两个参数 type是state的key，后面添加的是state的值，后面的方法是用于更改type的
    return (
        <div>
            {
                type
            }
            <button onClick={()=>{changeType("1111")}}>修改</button>
        </div>
    )
}
export default One
```
* NavLink 或者Link的to还有一种写法，除了字符串形式还可以传对象
* <NavLink to={{pathname:xxx}} >
* NavLink的选中样式，如果多个子路由会串，然后可以使用activeClassName修改
```

```
#### 限制性路由守卫，类似于vue的路由守卫
* Route 有一个render属性 能够代替component来切换组件
* render属性里面渲染的组件是不会自带Route的三个属性的，histroy... 所以需要主动传参
* 而且不但能够传Route的三个属性，还可以传递其他参数非常的方便
* <Route path="/test" render={(props)=>{ return <Test {...props} a={666} /> }} />
```
//父组件可以显示通过render渲染子组件，但是记得要加上props参数，因为组件不会自带Route的三个属性，还可以自由传参
<Route path="/one" render={(props)=><One {...props} a={666} />}></Route>
```
* 通过一个三目运算符即可做出简单判断
```
<NavLink to="/one">跳转one</NavLink>
     <NavLink to="/two">跳转two</NavLink>
     <Switch>
       <Route path="/one" component={One}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/two" render={(props)=>{ //使用简单的三目运算符即可
            return sessionStorage.getItem("user")?<Two {...props} />:<Redirect to="/login" />
          }}></Route>
          <Redirect from="/" to="/one" exact />
        </Switch>
```
* 但是上面的代码不够优雅，一般是自己封装一个myroute进行限制性路由，只要是通过这个myroute就可以实现隔离
* 这样就能实现代码整齐统一
```
//父级组件：
import MyRoute from "./components/myroute"
...代码
<MyRoute path="/two" component={Two}></MyRoute>

//子级MyRoute代码:
import React, { Component } from 'react'
import {Route,Redirect} from "react-router-dom"

export default class MyRoute extends Component {
    render() {
        let {path,component:Com} = this.props //解析的时候注意component要换大写 因为下面封装的时候组件需要大写
        return (
            <div>
                <Route path={path} render={(props)=>{
                    return sessionStorage.getItem("user")?<Com {...props} />:<Redirect to="/login"></Redirect>
                } } ></Route>
            </div>
        )
    }
}
```
* 拓展一个比较常用的Redirect的to也能传location.state的属性
```
//父级进行重另向跳转的时候，Redirect的to属性不但能够传字符串，还能传一个对象，在重另向的同时会传递过去
<Redirect to={{pathname:"/login",state:{path:xxx} }} ></Redirect>

//然后子路由进行接收的时候也是使用this.props.location.state.xxx接收即可
console.log(this.props.location.state.path)
```
* 扩展Route不常用的一个属性，children，无论path有没有匹配上都会渲染里面的组件
```
<Route path="/test" children={(props)=><Test {...props} />} />
```
#### redux 类似于vue的状态管理vuex
* 首先先要安装: cnpm install redux -S
* 有三大原则：1.单一数据源 2.State是只读的 3.使用纯函数来执行修改
* 然后需要在src文件夹下新建一个store文件夹，创建一个index.jsx文件输入一下命令
* store仓库是唯一的
```
import {createStore} from "redux"  //引入redux组件

var initState = {
    n:111
}

var reducer = (state=initState,action)=>{ //存储数据就用state，然后数据的修改就是用action
    return state
}

var store = createStore(reducer)  //创建一个仓库，注意 这个仓库是唯一的，里面要传一个reducer的函数

export default store
```
* 为了让代码更加清晰和清晰，我们一般将里面的reducer拆分出来，单独一个文件再由store引入，所以我们在store文件夹下再新建一个reducer.js文件
```
//新建的reducer.js文件下
var initState = {
    n:111
}

var reducer = (state=initState,action)=>{
    return state
}

export default reducer

//然后主文件index.jsx再将reducer引入即可
import {createStore} from "redux"
import reducer from "./reducer"

var store = createStore(reducer)

export default store
```
* 安装一个vsCode的插件，作用是快速生成store的代码:React-Native/React/Redux snippets for es6/es7
* 增加store需要直接在render的inisState添加，获取使用store.getState().xxx，
* 修改store需要用到store.dispatch({"type":"REC",path:xxx}) 其中"type"是固定格式，后面跟着的是修改store里的state方法，第二个是传过去的参数
* 首先在需要用到修改的子组件中使用，注意注意注意：store的action里面的type值绝对不能重复
```
import store from "../../store" //首先先引入
...代码
store.dispatch({"type":"REC",path:"/two"}) //设置type和传递参数
```
* 此时store里面注意修改参数,是通过reducer里面的action.type进行判断，然后用action.xxx进行修改即可
* 修改参数有两种方式
```
let initState ={
    path:""
}

let reducer = (state=initState,action)=>{
    if(action.type === "REC"){
		//第一种方式：三段式，先将原数组拆出来，修改之后再返回新数组
        // let newState = {...state}
        // newState.path = action.path
        // return newState
		//第二种是直接解构，然后通过ES6新语法，后面补充修改的内容
        return {...state,path:action.path}
    }
    return state
}

export default reducer
```
* 但是，如果是将store里面的数据放入子组件的state状态里面，当store修改之后，因为没有通过this.setState所以是无法更新的
* 所以需要监听或者说是订阅store的数据变化的函数
* 在redux里面有一个重要参数可以监听store里面的属性变化，通过store.subscribe()可以监听
```
import React, { Component } from 'react'
import store from "../../store"

export default class One extends Component {
    constructor(props){
        super(props)
        this.state={
            num:store.getState().num
        }
        this.change = this.change.bind(this) 
        store.subscribe(this.node)  //在constructor里面引入这个监听函数,当store数据发生变化就启动里面的函数更新state
    }
    node=()=>{ //因为要使用this,所以用箭头函数
        this.setState({
            num:store.getState().num 
        })
    }
    change(){
        store.dispatch({type:"ADD"}) //触发ADD事件修改store值
    }
    render() {
        return (
            <div>
                <button onClick={this.change}>+</button>
                {
                    this.state.num
                }
            </div>
        )
    }
}
```
* 为了让代码更加优雅，一般将store.dispatch()里面的函数拆出来
* 而且还可以把传过去的type值也用const常量化
```
//将传过来的type值常量化，减少代码冗余


//将函数拆出来再放入store.dispatch()里面也能实现同样的效果
import {ADDITION,SUB} from "../../store/normal"

export default {
    addition(p){
        return {
            type:ADDITION,
            p
        }
    },
    sub(p){
        return {
            type:SUB,
            p
        }
    }
}
//然后使用的时候直接调用这个文件里的方法即可
import cap from "..." //引入上面的文件地址
change(a){
        if(a === 1){
            store.dispatch(cap.addition(2))
        }else{
            store.dispatch(cap.sub(2))
        } 
    }
```
* 为了使代码进一步分工分明，简洁优雅
* 一般会设置两种组件，一种是容器组件，专门负责调用store里面的数据的还有一些方法
* 第二种是ui组件，该组件只负责渲染就可以了，然后将ui组件合并到容器组件里面，将容器组件抛出即可
```
import React, { Component } from 'react'
import store from "../../store"
import cap from "./cap"

class One extends Component {  //UI组件，只是负责渲染即可，分工明确
    render() {
        let {num,change} = this.props
        return (
            <div>
                <button onClick={change.bind(this,1)}>+</button>
                {
                    num
                }
                <button onClick={change.bind(this,2)}>-</button>
            </div>
        )
    }
}

class GetOne extends Component{ //容器组件，负责调用store和各类方法
    constructor(props){
        super(props)
        this.state={
            num:store.getState().num
        }
        // this.change = this.change.bind(this)
        store.subscribe(this.node)
    }
    node=()=>{
        this.setState({
            num:store.getState().num
        })
    }
    change(a){
        if(a === 1){
            store.dispatch(cap.addition(2))
        }else{
            store.dispatch(cap.sub(2))
        } 
    }
    render(){
        return <One num={this.state.num} change={this.change} /> //然后将UI组件合并到容器组件里面
    }
}

export default GetOne //最后将容器组件抛出即可
```
* es6新方法reduce(prev,cur) 能够简单操作数组乘积，求和，甚至数组去重
```
var num = [1,2,3,4]
        let now = num.reduce((perv,cur)=>perv+cur)  //第一个参数是指前面那个数 第二个参数值当前的数 最后能得出求和的值
        let now2 = num.reduce((prev,cur)=>prev*cur)
        console.log(now)
        console.log(now2)
```
* 高级用法：数组去重
```
let arr = [1,2,3,4,4,1]
let newArr = arr.reduce((pre,cur)=>{
    if(!pre.includes(cur)){
      return pre.concat(cur)
    }else{
      return pre
    }
},[])
console.log(newArr);// [1, 2, 3, 4]
```

#### 高阶组件：参数是组件，返回值也是组件
* 属性代理功能:现在有一个这样的需求，任何组件被这个高阶组件套住之后都能返回一个版权信息，相当于给组件添加一些相同的元素
* 可以在component文件夹下新建一个hoc文件夹，在hoc文件夹下新建一个index.js
* 至于为什么Hoc里面还要嵌套一个类组件，是因为只有类组件的jsx语法能够识别<Com />这类传值进去的组件
* 但是注意，如果用Hoc嵌套的组件父组件传值的时候需要在Hoc里面加上{...this.props}才能往下传
* 注意 注意 注意 高阶组件中无法使用编程式路由跳转，所以一般使用return Redirect跳转
```
import React from 'react'

export default function Hoc(Com) {
    return class extends React.Component{
        render(){
            return <div> <Com {...this.props}/> ©qf1916</div> //注意，一定要在组件里面加上{...this.props}不然父组件传值无法接收
        }
    }
}
```
* 然后其他组件引用的时候直接import进来嵌套即可
```
import Hoc from "../hoc"
...代码
export default Hoc(One)
```
* Hoc还有第二个功能：反向代理功能
* 原理是将传过来的组件之间继承，并设置条件进行返回，这个功能也叫渲染劫持
```
//Hoc修改后的组件
export default function Hoc(Com,jf) { //传递两个参数，第一个参数是需要渲染的组件，第二个参数是多少积分以供条件渲染
    return class extends Com{
        render(){
            if(jf<10){
                return <div> 对不起，积分不足 </div>
            } else {
				return <div>{super.render()} 欢迎vip客户</div>
            }
        }
    }
}
```

#### redux的context(上下文对象)
* context里面有两个对象生产者Provider Consumer
* 首先在components文件下创建一个myprovider文件夹，新建一个index.js
* 引入createContext组件 然后实例化，再将Provider 和 Consumer拆分出来
* 其中Provider包裹里面的所有组件都能通过value属性传递下去，无论透过多少层关系组件都能传递下去，子组件通过Consumer接收
* 注意 注意 抛出的时候要连同Consumer一起抛出，子孙组件如果有需要这个属性的就引入这个Consumer即可
* 注意 Consumer只能在render里面进行渲染，所以为了能在方法里使用传递的value值可以用context传递,然后用this.context获取
* 在方法里使用context一定要加上一个静态方法 static contextType = context
```
import React, { Component ,createContext} from 'react'

let context = createContext()
let {Provider,Consumer} = context
class Myprovider extends Component {
    render() {
        return (
            <div>
                <Provider value={{a:1,b:2,c:3}}>
                    {
                        this.props.children
                    }
                </Provider>
            </div>
        )
    }
}

export {Myprovider,Consumer,context}  //记得要把Consumer一同抛出即可，负责接收 context抛出为了能在方法里使用
```
* 新建之后在入口文件index.js文件中引入这个Myprovider，并将整个App组件包裹起来即可
```
import React from 'react';
import Twos from "./components/twos"
import './App.css';
import {Consumer,context} from "./components/myprovider" //一定要引入Consumer还有context

class App extends React.Component{
  static contextType = context  //如果要在函数中使用context一定要使用这个静态方法，不然会取不到值
  componentDidMount(){
    console.log(App.contextType)
    console.log(this.context) //用this.context即可获取上级传递下来的value值
  }
  render(){
    return (
      <div className="App">
        <Consumer>
          {
            (value)=>{ //直接用函数参数的形式返回value值即可
              return Object.keys(value).map((item)=>{
                return (
                <div key={item}>{value[item]}</div>
                )
              })
            }
          }
        </Consumer>
        <Twos />
      </div>
    );
  }
}

export default App;
```
* 而且context上下文还可以和store一起使用，将整个store当做value传给整个app组件，然后就能用context替换掉store
* 只需要引入context即可，并且在使用Consumer的时候，里面函数的value值也会直接变成store
* 第一步：首先在index.js入口文件中将store引入并传递给Myprovider组件，由整个组件传递给context
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Myprovider} from "./components/myprovider"
import store from "./store"  //引入store

ReactDOM.render(
    <Myprovider store={store}> //然后用父组件传值的方式传递给自己组件的Provider
        <App />
    </Myprovider>
    , document.getElementById('root'));
```
* 传递给自己组件的Provider，然后包裹中的APP组件内的所有组件都含有store的context属性，都可以使用
```
class Myprovider extends Component {
    render() {
        return (
            <div>
                <Provider value={this.props.store}> //value值传递上面的store
                    {
                        this.props.children
                    }
                </Provider>
            </div>
        )
    }
}
```
* 然后在App里的所有组件都可以使用这个context了，并且能在constructor里面的第二个参数中引入进来使用，也是很方便
```
import {Consumer,context} from "./components/myprovider"

class App extends React.Component{
  static contextType = context
  constructor(props,context){ //直接添加第二个参数context
    super(props,context);
    this.state={
      n:context.getState().first //然后使用这个context代替store即可
    }
  }
```
#### combineReducers组件模块化:当store里面需要多个reducer的时候，需要建立一个总的引用，然后用小组模块分开
* 在store文件夹下的reducer文件引入combineReducers
* 然后再将哪个组件需要用到的reducer进行引用即可
```
import nodeReducer from '../components/node/reducer' //引用node模块的reducer

import {combineReducers} from 'redux'; //引入combineReducers进行使用

var reducer = combineReducers({
    node:nodeReducer //然后放进里面更改名字
})

export default reducer;
```
* 最后在组件中使用的时候记得要多加上被修改的reducer名字
* 即要输入store.getState().模块名字.xxx
```
constructor(props,context){
        super(props,context);
        this.state={
            n:context.getState().node.n
        }
        context.subscribe(()=>{
            this.setState({
                n:context.getState().node.n //这里的store更改为了context，使用的时候要加上node
            }) 
        })
    }
```
* 但是如果这样操作起来还是很麻烦，需要引进的东西太多了，所以方便使用，有一个神奇的插件
#### 引进react-redux
#### connect是一个高阶组件，作用是连接容器组件和ui组件
* connect做了两件事情：1.省略了所有包括store的引入还有订阅步骤  2.可以直接把actionCreate的动作拿过来帮忙发出
* 首先先进行安装:cnpm install react-redux -S 或者 yarn add react-redux
* 然后在入口文件index.js中引入react-redux的{Provider}，这个Provider对应上面的Myprovider
```
import { Provider } from "react-redux"
import store from "./store"
<Provider store={store}> //然后要引入这个store
	<App />
<Provider>
```
* 然后在src根目录下新建一个store文件夹，新建一个index.js和总的reducer.js文件
```
//index.js文件下
import {createStore} from "redux"
import reducer from "./reducer"

let store = createStore(reducer)

export default store

//reducer.js文件下
import {combineReducers} from "redux"
import initNode from "../components/node/reducer" //这里引入需要引入的模块reducer

var reducer = combineReducers({
    node:initNode
})

export default reducer
```
* 然后就可以直接在组件中使用这个store了，关键性组件是connect
* connect能将所有繁琐的基础功能简化，然后全部传送到this.props上面，
* 从store里面取值就直接使用this.props.模块名.xxx  然后需要修改值的时候引入actionCreator，里面的方法也用this.props.方法名 修改即可
* 假设现在在components文件夹下新建一个node文件，作为目标文件夹，index.jsx部分
```
import React, { Component } from 'react'
import {connect} from "react-redux" //引入connect组件，该组件省略了getState()还有订阅subscribe()还有dispatch()功能
import actionCreator from "./actionCreator" //引入修改store里面的state的方法action，也创建在同一个组件目录下引用即可

class Node extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                {
                    this.props.node.n //然后直接使用this.props.模块名.xxx引用即可
                }
                <button onClick={this.props.inAdd}>+</button> //如果需要修改state的方法也很简单，直接引用，连bind都不需要
            </div>
        )
    }
}

let initState = (state)=>state //第一步是将store里面所有的state全部返回到该组件里面

export default connect(initState,actionCreator)(Node) //第二步是将所有的state修改方法也引进，并且挂载在该组件上
```
* 在node目标组件文件夹下的reducer.js文件
```
const initialState = { //在里面添加store的state
    n:123
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case "ADD":  //这里的修改状态方法会被存放在actionCreator文件里面
        return { ...state, n:state.n + 1 }

    default:
        return state
    }
}

```
* 在node目标组件文件夹下的actionCreator.js文件
```
export default {
    inAdd(){
        return {
            type:"ADD"
        }
    }
}
```
* mapState不单单可以用来做映射关系放进connect里面，还可以拆出来，类似于vue的getter，在渲染之前使用一次state里面的值
* 这种方法会更加常用一点，因为更加直观而且可以操作里面的state
* 注意注意注意，但是用了这种方法操作state之后，在reducer文件中修改state数据的时候要从浅拷贝变成深拷贝，不然容易无法刷新
```
let mapState = (state)=>({  
    list:state.todo.list,
    label:state.todo.list.length>3?"超过三条":"没超过三条"
})
export default connect(mapState,actionCreator)(Todolist)
```
* 在reducer文件中修改为深拷贝，可以利用JSON.parse(JSON.stringify(xxx))
```
 case "ADDLIST":
        var newState = JSON.parse(JSON.stringify(state))
        newState.list.push(p)
        return newState
```

#### react里面的异步操作，为了能让store状态里面的state异步执行的一个组件，一个中间件项目
* redux-thunk能让在actionCreator里面，方法是要返回，并且参数就是dispatch
* 首先先进行安装这个异步组件: yarn add redux-thunk  或者 cnpm install redux-thunk -S
* 然后找到store文件夹下的index.js入口文件，引入"redux"组件的applyMiddleware还有redux-thunk进行配置
```
import {createStore,applyMiddleware} from 'redux'; //引入applyMiddleware，作用是将所有中间件组成一个数组，依次执行
import reducer from './reducer'
import thunk from 'redux-thunk'
var store = createStore(reducer,applyMiddleware(thunk)); //然后再createStore里面的第二个参数里面传进去

export default store;
```
* 然后就可以在各个组件中的actionCreator.js文件中进行异步操作了
* 本质上这个中间件是在action作用之前执行的，所以叫中间件
* 注意，里面的dispatch方法是通过中间件才会存在
```
asyncTest(){  //异步测试的方法
        return (dispatch)=>{    //异步的方法是返回回调函数 ,参数是 dispatch
             setTimeout(()=>{
                dispatch({
                    type:"TEST"
                })
             },3000);
        }
    },
```
* 一般这个中间件会用来在actionCreator.js调后台接口，然后直接使用
```
//注意，是在actionCreator.js文件下调用接口
getData(){
        return (dispatch)=>{
            fetch("http://localhost:4000/list").then((res)=>res.json()).then((res)=>{
                console.log(res);
                dispatch({
                    type:'GETDATA',
                    list:res
                    
                })
            })
        }
    }
```
* 因为redux-thunk不纯粹，不单单处理actionCreator，还异步请求数据，不好维护，所以可以用saga来替代
* 异步的第二种解决方案:redux-saga，这个中间件可以运行  生成器函数
* 生成器函数是一个能控制返回的函数返回值由yield控制，每次执行的时候使用next()即可获取数据
```
function *fun(){
    yield "hello"
    yield "who"
}
var g = fun() //需要先获取这个值
console.log(g.next()) //然后使用的时候，使用next进行调用 每一次只会出现yield的那一层数据
console.log(g.next())
```
* 首先先安装:yarn add redux-saga 
* 然后在store.js文件里进行引用
```
import {createStore,applyMiddleware} from "redux"
import reducer from "./reducer"
import createSagaMiddleware from "redux-saga"
import watchAll from "./saga"

var sagaMiddleware = createSagaMiddleware()

var store = createStore(reducer,applyMiddleware(sagaMiddleware))

sagaMiddleware.run(watchAll)
export default store
```
* 然后在store文件夹下新建一个saga.js文件，单独放置异步中间件调用的函数
* 其中需要引入redux-saga/effects里的异步方法:takeEvery 负责监听事件，call负责调用后台数据，put相当于dispatch能够将res返回给actions刷新页面
* 注意注意注意 下面代码中所监听的WATCHALL 方法是可以没有任何reducer的，换句话说只是一个中间载体
```
import {takeEvery,call,put} from "redux-saga/effects"

function *getdata(){
    var result = yield call(()=>{
        return fetch("http://localhost:4000/list").then((res)=>res.json()) //这个方法用于调用后台数据
    })
    yield put({ //相当于dispatch方法，能将数据传递过去，并刷新list渲染
        type:"GETDATA", 
        list:result
    })
}

export default function *watchAll(){
    yield takeEvery("WATCHALL",getdata) //监听WATCHALL的action，如果一执行就会触发上面的函数getdata
}
```
* 然后在组件文件夹下的actionCreator.js中调用WATCHALL就可以触发上面的saga
```
    getData(){
        return {
            type:"WATCHALL"
        }
    }
}
```
* 当前组件文件夹下的reducer文件也要新建一个GETDATA方法渲染list列表
```
case "GETDATA":
        var newState = {...state}
        newState.list = list
        return newState
```
#### React的专属UI库 ant design
* antUI库有两个版本，一个是手机端用的ant design mobile，一个是PC端用的ant design
* 首先ant有两种安装方法，一种是全局安装，另一种是局部安装
* 全局安装，cnpm install antd -S
* 然后按照官网指示，在app.js中引入需要的组件
```
import React from 'react';
import { Button } from 'antd';  //引入需要的组件button
import './App.css';

function App() {
  return (
    <div className="App">
      <Button type="primary">Button</Button> //然后之间使用这个组件，就会出现一个按钮
    </div>
  );
}

export default App;

```
* 这样引入了组件之后还没有样式，样式会放在入口文件index.js中，也是用import引入
* 页面中就会出现一个ui按钮啦
```
import 'antd/dist/antd.css';
```
* antUI库的第二种安装方式，按需加载，按需加载属于高级选项，设置了还能更改主体颜色等功能
* 首先安装按需加载插件: yarn add react-app-rewired customize-cra 或者react-app-rewired customize-cra分别用cnpm下载
* 其中react-app-rewired 这个插件是为了能不用弹射 就可以在表面配置webpack
* 然后第二个customize-cra 这个插件可以 自定义脚手架环境的配置
* 然后再在项目文件下的package.json里面设置scipts
```
"scripts": {
    "start": "react-app-rewired start", //主要是修改这三条
    "build": "react-app-rewired build",
    "test": "react-app-rewired test", 
	 
    "eject": "react-scripts eject"
  },
```
* 在项目的根目录下，和src同级目录新建一个配置文件config-overrides.js，然后进行配置
```
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config;
};
```
* 然后还需要安装按需加载的插件:babel-plugin-import
* 安装: cnpm install babel-plugin-import -S
* 然后修改上面根目录下的配置文件config-overrides.js
```
const { override, fixBabelImports } = require('customize-cra');
module.exports = override(
       fixBabelImports('import', {
         libraryName: 'antd',
         libraryDirectory: 'es',
         style: 'css',
       }),
     );
```
* 然后这个时候，在刚刚入口文件index.js里引入的css样式import 'antd/dist/antd.css';就可以删掉了
* 如果想要配置主题的话，需要再下载一个插件less和less-loader
* cnpm install less -S和 cnpm install less-loader -S
* 然后再将上面的config-overrides.js文件改为以下代码
```
const { override, fixBabelImports } = require('customize-cra');
module.exports = override(
       fixBabelImports('import', {
         libraryName: 'antd',
         libraryDirectory: 'es',
         style: true, //改为true
       }),
       addLessLoader({  //增加这个选项
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#00F' }, //里面就可以更改主题颜色
      })
     );
```
* 如果想要像vue一样能用@指定为src根目录下，可以再加上一行配置代码
* 注意修改这个文件之后一定要重启项目才会实现
```
const { override, fixBabelImports,addLessLoader,addWebpackAlias  } = //需要先引入这个插件
require('customize-cra');
const {resolve}=require("path");
module.exports = override(
       fixBabelImports('import', {
         libraryName: 'antd',
         libraryDirectory: 'es',
         style: true,
       }),
        addLessLoader({
           javascriptEnabled: true,
           modifyVars: { '@primary-color': '#00F' },
         }),
         addWebpackAlias({ //修改@为src目录
          '@': resolve('src')
      })
     );
```
* 安装装饰器 @babel/plugin-proposal-decorators
* cnpm install @babel/plugin-proposal-decorators -S
* 然后在上面的配置文件中引入addDecoratorsLegacy函数
```
const { override, fixBabelImports,addLessLoader,addWebpackAlias,addDecoratorsLegacy } = //多增加一个addDecoratorsLegacy
require('customize-cra');
...
module.exports = override(
		addDecoratorsLegacy(), //然后启动一下这个函数 就能使用装饰器语法了
       fixBabelImports('import', {
         libraryName: 'antd',
         libraryDirectory: 'es',
         style: true,
	...代码
```
* 安装了装饰器之后，使用高阶函数Hoc的时候就能直接使用，而不用进行包裹
```
import React,{ Component } from 'react'
import Hoc from '../hoc'
 @Hoc  //可以直接用@Hoc使用这个组件 如果是没有装饰器之前的话使用方法是 Hoc(One)
 class One extends Component {
     componentDidMount(){
         fetch("/api/topics").then((res)=>res.json()).then((res)=>{
             console.log(res)
         })
     }
    render() {
        return (
            <div>
                One
            </div>
        )
    }
}
export default One;
```
* 配置正向代理，因为只是用customize-cra做服务器是不行的，所以要另外配置一个代理
* 首先先安装一个插件:cnpm install http-proxy-middleware -S
* 然后在src文件夹下新建一个setupProxy.js文件配置文件，进行如下配置
```
const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app) {
    app.use('/api', 
    createProxyMiddleware({ 
              target: 'https://cnodejs.org/api/v1', //这里写代理的网站
              changeOrigin: true, 
              pathRewrite:{
                  "^/api":"/" //将/api更换成/
              } 
            }
         ));
}
```
* 然后组件就可以直接调用这个代理接口获取数据
```
componentDidMount(){
         fetch("/api/topics").then((res)=>res.json()).then((res)=>{
             console.log(res)
         })
     }
```
* 设置路由的时候，最好能将路由单独设置一个文件router，然后区分出一级路由和二级路由
* 可以再components文件夹的同级目录下新建一个router文件夹，router文件夹下新建一个index.jsx文件
```
import Home from "../App"
import List from "../components/list"
import Setting from "../components/setting"
import Dashboard from "../components/dashboard"
import Notfind from "../components/notFind"
//一级路由
export const routes = [
    {
        path:"/home",
        component:Home
    },
    {
        path:"/404",
        component:Notfind
    }
]
//二级路由
export const subRoutes = [
    {
        path:"/home/dashboard",
        component:Dashboard
    },
    {
        path:"/home/list",
        component:List
    },
    {
        path:"/home/setting",
        component:Setting
    }
]
```
* 然后在入口文件index.js中引入一级路由 app.js
* 使用router文件夹中的routes进行map遍历
* 可以在最后的位置设置一个404跳转页面
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom"
import {routes} from "./router"

ReactDOM.render(
   <Router>
       <Switch>
            {
                routes.map((item,idx)=>{
                    return (
                        <Route key={idx} path={item.path} component={item.component}></Route>
                    )
                })
            }
            <Redirect from="/" to="/home" exact></Redirect>
            {/* <Redirect to="/404"></Redirect> */}
        </Switch>
   </Router>
, document.getElementById('root'));
```
* 然后就可以在app.js文件中引入一个组件负责，然后把二级路由放在子组件里面，利用this.props.children
* 类似vue插槽的作用，分离出子路由和子组件，非常的方便
```
import React from 'react';
import {Route,Switch,Redirect} from "react-router-dom"
import {subRoutes} from "./router"
import Admin from "./components/admin"  //引入一个子组件，负责渲染路由和主要界面效果

function App() {
  return (
    <div className="App">
      <Admin>
        {
          subRoutes.map((item,idx)=>{ //然后在子组件里面渲染Route
            return (
              <Route key={idx} path={item.path} component={item.component}></Route>
            )
          })
        }
      </Admin>
    </div>
  );
}

export default App;
```
* 然后子组件admin就只需要使用this.props.children分离出路由和内容即可
```
import React, { Component } from 'react'

export default class Admin extends Component {
    render() {
        return (
            <div>
				界面主要内容...
                {
					this.props.children
				}
            </div>
        )
    }
}
```
* "字符串".padStart(2,"0")  ES6新方法，当字符串不足两位的时候，在前面补一个0
* "字符串".padEnd(2,"0")  ES6新方法，当字符串不足两位的时候，在后面补一个0
* 随机切换rgba的256位数字颜色
```
changeColor(){
        let r = Math.floor(Math.random()*256)
        let g = Math.floor(Math.random()*256)
        let b = Math.floor(Math.random()*256)
        return "#"+r.toString(16).padStart(2,"0")+g.toString(16).padStart(2,"0")+b.toString(16).padStart(2,"0")
    }
```
#### 封装axios调用后台数据接口
* 在src文件下新建一个api文件夹，然后新建一个index.js文件，将axios进行封装
* 其中请求拦截器是为了发送数据请求的时候能带上token方便用户辨认
* 然后响应拦截器是为了减少获取数据难度，因为有些数据包裹很多层在外面
```
import axios from "axios"

var service = axios.create({
    baseURL:"/api",
    "content-type":"application/json",
    timeout:5000
})

//请求拦截器
service.interceptors.request.use((config)=>{
    console.log("请求拦截器")
    return config
})
//响应拦截器
service.interceptors.response.use((res)=>{
    return res.data
})

export default service
```
* 然后再在同级目录下新建一个request.js文件编写入口文件
```
import axios from "./index"  //引入已经封装好的axios文件

export const getList = (page,pageSize)=>{
    return axios.get("/pagelist",{params:{page,pageSize}}) //然后发送数据请求
}
```
* 如果涉及到跨域处理，需要在src文件夹下新建一个setupProxy.js文件进行配置
```
const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app) {
    app.use('/hd', 
    createProxyMiddleware({ 
              target: 'http://localhost:4000', //这里写代理的网站
              changeOrigin: true, 
              pathRewrite:{
                  "^/hd":"" //将/api更换成/
              } 
            }
         ));
}
```
* 后端使用mongodb仓库进行管理和加入存储
```
可以在系统自带cmd下输入命令:
mongo
show dbs //查看当前所有库的名字
use goodsmanage //创建一个库 库的名字就叫goodsmanage
db.表名字.insert({"name":"zs"})  //能够插入数据
```
* 然后就在后端的文件夹中使用命令行调用npm start启动数据库就行
* 有时候用后台数据渲染列表的时候，数据过来了但是组件却卸载了会报错，这个时候可以用componentWillUnmount将state重置
```
componentWillUnmount(){  //解决异步数据回来时,组件却卸载了
        //重写组件的setState方法，直接返回空
        this.setState = (state,callback)=>{
          return;
        };  
    }
```
* 数据上传要使用formidable这个包，这个是一个后端的包
* 前端使用antd库进行图片上传，要使用new FormData属性进行传值
```
import React, { Component } from 'react'
import { Upload } from 'antd';
import { upload } from "../../api/request"  //引入后台接口

export default class Setting extends Component {
    constructor(props){
        super(props)
        this.state={
            img:""
        }
    }
    onloader=({file})=>{ //引进这个参数的时候一定要用{}包裹，不然会报错
        var form = new FormData //先实例化一个FormData属性
        form.append("file",file) //然后将file属性塞进FormData实例化里面，注意里面的file名称需要和后端的名称一致
        upload(form).then((res)=>{ //然后把数据传递过去后端获取返回值
            if(res.status === 0){
                this.setState({
                    img:"http://localhost:4000"+res.path //这个地址一定要加上前面的http，不然无法访问到图片
                })
            }
        })
    }
    render() {
        let {img} = this.state
        return (
            <div>
                <Upload listType="picture-card" showUploadList={false} customRequest={this.onloader}> //customRequest属性是覆盖本来的form表单
                    {img?<img src={img} style={{"height":"200px","width":"200px"}} />:"上传"}
                </Upload>
            </div>
        )
    }
}
```
* 请求拦截器带上token进行访问，响应拦截器检查是否带有token
```
// 请求拦截器
service.interceptors.request.use((config)=>{
    if(sessionStorage.getItem("token")){
        config.headers["token"] = sessionStorage.getItem("token")
    }
    return config
})
// 响应拦截器
service.interceptors.response.use((res)=>{
    if(res.data.status === -1){
        console.log("token验证失败")
        window.location.href="/login"
    }
    return res.data
})
```
* 图床  [](http://www.tietuku.com/)
#### 异步加载组件 react-loadable 能让组件进行异步加载，类似于vue的一样
* 首先先安装这个包:cnpm install react-loadable -S
* 然后在路由模块router文件夹下的index.js中修改
```
import React,{Component} from 'react'  //一定要系上react
import Loadable from "react-loadable"
var Home = loadable({
	loader:()=>import("../App"),   //异步加载这个组件
	loading:()=><div> loading... </div>  //如果还没加载完就会显示这个
})
...代码
```
#### mobx 状态管理工具 类似于redux，但是明显感觉redux会好用一点
* mobx和redux不一样的地方在于，mobx可以有多个仓库，然后使用的是面向对象的语法
* 安装mobx：cnpm install mobx -S 和 cnpm install mobx-react -S
* 在src文件夹下新建一个store文件夹，再新建一个index.js
* 注意autorun和reaction两个方法都需要放在数据发生改变的上面才能监听到
```
import {observable,action} from "mobx"

class Store {
    @observable n =3;
    @observable x = 4;
    @action  //action 是负责修改值的
    change=()=>{
        this.n ++
    }
}

var store = new Store()


export default store

```
* 然后再在需要使用到store的地方加入即可
```
import React, { Component } from 'react'
import store from "../../store"
import {autorun,reaction} from "mobx"  //引入两个监听方法

export default class One extends Component {
    constructor(props){
        super(props)
        this.state={
            n:store.n
        }
    }
    componentDidMount(){
        // autorun(()=>{  //这个监听方法是监听所有的store数据，如果有变化就触发
        //     this.setState({
        //         n:store.n
        //     })
        // })
        reaction(()=>[store.n],()=>{  //这个方法是监听某一个store属性
            this.setState({
                n:store.n
            })
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.n
                }
                <button onClick={store.change}>+</button> //直接调用store里面的action 方法即可修改store值
            </div>
        )
    }
}
```
* 但是如果使用autorun或者reaction来监听的话，代码量太过繁琐，所以可以用mobx-react中的observer来替代
```
import React, { Component } from 'react'
import store from "../../store"
import {observer} from "mobx-react"  //直接引入observer然后进行使用即可

@observer
class One extends Component {
    render() {
        return (
            <div>
                {
                    store.n  //然后就能实时监听到store里面的数据
                }
                <button onClick={store.change}>+</button>
            </div>
        )
    }
}
export default One
```
#### immutable react提高性能神器
* 首先先安装这个神器:cnpm install immutable -S
* immutable是一个一创建就不能修改的属性，如果要修改的话会新建一个完全一样的值
* set修改数据 get获取数据 Map是设置初始数据
```
import {Map} from "immutable"

var v1 = Map({"a":123})
var v2 = v1.set("a",333)
console.log(v1.get("a"))  //123
console.log(v2.get("a"))  //333

```
* 比较数据的内容是否相等 而不是地址相等的时候可以用equals和is语法进行判断
```
a.equals(b)  //如果这两个相等的话返回true
is(a,b)   //如果这两个相等话也返回true
```
* 扩展一个包，能以组件化的形式修改样式 style-components
* 安装 cnpm install style-components -S
```
import React, { Component } from 'react'
import store from "../../store"
import styled from "styled-components"

var Div = styled.div`
    background:#ccc;
    height:200px;
`

class One extends Component {
    render() {
        return (
            <div>
                <Div></Div>
            </div>
        )
    }
}
export default One
```
#### 配置移动端rem自适应页面 (不一定成功)
#### 如果不成功就使用Vue的方法
* 首先先把需要的安装包下载下来
* cnpm install lib-flexible --save
* cnpm install sass-loader node-sass --save-dev
* cnpm install postcss-px2rem --save
* 然后在node_modules/react-scripts/config/webpack.config.js 文件下配置如下
```
...代码
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');
//移动端配置
const px2rem = require('postcss-px2rem');  //增加这一栏 下面也要进行引用
// @remove-on-eject-begin
const eslint = require('eslint');
const getCacheIdentifier = require('react-dev-utils/getCacheIdentifier');
...代码

plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            // Adds PostCSS Normalize as the reset css with default options,
            // so that it honors browserslist config in package.json
            // which in turn let's users customize the target behavior as per their needs.
            postcssNormalize(),
            px2rem({ remUnit: 75 }), //增加这一栏
          ],
          sourceMap: isEnvProduction && shouldUseSourceMap,
```
* 然后在静态文件index.html中引入这个
```
<meta name="viewport" content="width=device-width,inital-scale=1.0,
maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
```
* 然后在程序入口文件index.js中引入
```
import 'lib-flexible' //注意 这个最好放最后引入 不然容易报错
```