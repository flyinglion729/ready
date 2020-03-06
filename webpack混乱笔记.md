学习目标：了解底层的工程架构
webpack打包文件
四大核心：enter ouput loader plugins

全局安装:cnpm install webpack -g
然后安装cli: cnpm install webpack-cli -g
* 注意注意注意：为了安全起见，最好在本地安装一下，不然在后面加入webpack.config.js文件的时候会报错
* cnpm install webpack -S 还有 cnpm install webpack-cli -S
* 这个时候只能压缩js文件、如果要压缩css文件则需要添加loader

新建一个文件：
* npm init 新建一个package.js
* 然后新建一个utils文件夹，里面存放一个test.js文件进行测试
```
//test.js文件
console.log("这是test文件")
```
* 然后在utils文件夹同级的根目录下新建一个index.js文件进行测试,此时index.js为入口文件
```
import "./utils/test" //引入上面创建的测试文件
console.log("这是index入口文件")
```
* 最后在根目录下使用命令行输入webpack index.js启动执行入口文件
* 会自动打包生成一个dist文件，可以再dist文件中新建一个index.html,并在html文件中引入main.js测试
```
//index.html文件
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <script src="./main.js"></script>
</body>
</html>
```
* 但是以上方法适合一两个项目文件，当文件多起来就需要配置文件进行个性化配置了
* 在项目的根目录新建一个webpack.config.js  用于设置打包文件配置
* 注意:vue当中的vue.config.js就是基于webpack.config.js上的再次封装
```
var path = require("path")

module.exports = {
    entry: path.join(__dirname,"./index.js"),  //指定打包文件的路径
    output:{
        // filename:"bundle.js",  //指定导出打包文件的文件名，如果不设置会默认设置为main.js也能使用
        path:path.resolve(__dirname,"./dist")  //指定导出打包文件的路径
    }
}
```
* 注意在package.json文件中设置build="webpack"，然后就可以再命令行输入npm run build执行打包程序
```
//在package.json文件里面
{
  "name": "webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"   //修改为webpack
  },
  "author": "",
  "license": "ISC"
}
```
* 然后执行npm run build即可

#### Loader模块
* 每次都需要在dist文件新建一个index.html来进行测试太麻烦了，所以引入一个自动生成模块
* cnpm install html-webpack-plugin -D
* 然后在webpack.config.js中引用
```
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')//引入模块

module.exports = {
    entry: path.join(__dirname,"./src/index.js"),
    output:{
        // filename:"bundle.js",
        path:path.resolve(__dirname,"./dist")
    },
	plugins: [      //插件模块
	    new HtmlWebpackPlugin({   //然后在插件模块里面使用一下
			template:path.join(__dirname,"./public/index.html") //指定哪一个html文件作为展示文件
		})  
	]
}
//一般会新建一个public文件夹放浏览器静态文件，然后新建一个index.html作为展示页面
```
* 安装css的loader文件，负责压缩css文件
* 先进行安装cnpm install style-loader -D
* 然后再接着安装cnpm install css-loader -D
* 这两个loader其实不一样，但是需要安装这两个才能压缩css文件
* 接下来在src文件夹下新建一个assets静态文件夹，新建一个test.css文件进行测试
* 注意：当前的src文件夹下有main.js入口文件,utils文件夹,还有assets文件夹.修改了文件路径之后要去webpack,config.js文件中修改
```
html,body{
    background-color: orange;
}
```
* 然后在入口文件main.js中引入
```
import "./utils/test"
import "./assets/css/test.css"  //直接引入路径

console.log(22)
```
* 还有关键的一步，在webpack.config.js中加入module,并设置规则
```
var path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')//引入模块

module.exports = {
    entry: path.join(__dirname, "./src/main.js"),  //指定打包文件的路径
    output: {
        // filename:"bundle.js",  //指定导出打包文件的文件名，如果不设置会默认设置为main.js也能使用
        path: path.resolve(__dirname, "./dist")  //指定导出打包文件的路径
    },
    plugins: [      //插件模块
        new HtmlWebpackPlugin({   //然后在插件模块里面使用一下
            template: path.join(__dirname, "./public/index.html") //指定哪一个html文件作为展示文件
        })
    ],
    module: {    //***在这里面加入规则即可
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            }
        ]
    }
}
```
* 引入sassLoader:需要引入两个模块一个是node.sass，还有一个是sass-loader,这里有必要说明一下
* sass-loader是基于node.sass开发的一个module，然后为了尊重版权，所以两个都要安装
```
cnpm install node-sass -D
cnpm install sass-loader -D
```
* 然后接下来在src文件夹的assets静态文件夹，新建一个test.css文件进行测试，和css步骤一样
```
import "./utils/test"
import "./assets/css/test.css"       
import "./assets/css/moment.scss"  //需要在入口文件引入sass

console.log(22)
```
* 然后同样的，在webpack.config.js中引入scss规则,但是为了能和css打包一起压缩，代码写在一起
```
module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [
                    // 这三个loader顺序，是固定的
                    { loader: 'style-loader'}, // 将 JS 字符串生成为 style 节点
                    { loader: 'css-loader'},  // 将 CSS 转化成 CommonJS 模块
                    { loader: 'sass-loader'}  // // 将 Sass 编译成 CSS
                ]
            }
        ]
    }
```

#### 设置代码热更新效果 利用devServer
* cnpm install webpack-dev-server -D  本地安装，为了防止报错最好再全局安装一下
* cnpm install webpack-dev-server -g  全局安装
* 然后在webpack.config里面配置devServer的配置
```
module.exports = {
    entry: path.join(__dirname, "./src/main.js"),  //指定打包文件的路径
    output: {
        // filename:"bundle.js",  //指定导出打包文件的文件名，如果不设置会默认设置为main.js也能使用
        path: path.resolve(__dirname, "./dist")  //指定导出打包文件的路径
    },
    devServer: {
        port: '8888',  //设置服务器端口号
        contentBase: path.join(__dirname, './public'),  //告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。
        hot: true //是否开启热更新
    },
}
//值得注意的是：只有已经在入口文件main.js引入的文件才可以实现热更新效果，所以静态文件例如index.html是不会发生刷新的
//简单来说就是devServer是监听output打包好的出口文件，但是分为开发环境和生产环境，开发环境中还没有dist文件，所以会指定public文件
//但是如果使用build的话就得改变打包上线的文件夹dist
```
* 然后注意在使用热更新的时候不能使用npm run build命令，得使用webpack-dev-server --open启动热更新
* npm run build是项目上线之后的打包，不同于webpack-dev-server，后者更倾向于开发环境中
* 然后为了平时方便启动，可以在package.json文件中加入配置:
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.config.js",  //这样设置可以直接npm build
    "serve": "webpack-dev-server --open",	//打开serve系统主要为下面做准备
    "start": "npm run serve" //直接开始开发环境
  },
```
* 热更新的概念是:
* 浏览器是客户端、devServer是服务端。devServer和服务端之间有一个websocket通信,其中websocket是常链接不中断的
* 当代码发生改变的时候，websocket就会找出其中改变的代码通知webpack进行更新,然后将更新打包的代码发送给客户端浏览器 

#### env
* 因为在开发环境中output需要指向public，但是生产环境则需要指向dist,而且生产环境是不需要devServer本地服务器的
* 为了区别生产环境和开发环境，不用频繁切换，所以做一个env的判断
* cross-env 用于改变进程里面的env 可以供命令行发送使用
* 首先，先行安装env的依赖库cross-env
```
cnpm install --save-dev cross-env
```
* 然后可以在package.json中设置命令行，以供放置参数
```
"scripts": {
    "build": "cross-env NODE_ENV=production webpack --config webpack.config.js",
    "serve": "cross-env NODE_ENV=development webpack-dev-server --open",
    "start": "npm run serve"
  },
//其中cross-env NODE_ENV=production和cross-env NODE_ENV=development为设置env设置参数
```
* 然后在webpack.config.js中获取到env参数
```
var env = process.env.NODE_ENV
```
* 整个过程是，命令行设置env参数，然后发送命令之后读取到webpack.config重新读取到env并进行赋值
* 然后整理整个webpack.config.js文件的代码，进行区别筛选
```
var path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')//引入模块

var env = process.env.NODE_ENV

var config = {
	mode: 'production', //这是生产环境的代码标识
    entry: path.join(__dirname, "./src/main.js"),  //指定打包文件的路径
    output: {
        // filename:"bundle.js",  //指定导出打包文件的文件名，如果不设置会默认设置为main.js也能使用
        path: path.resolve(__dirname, "./dist")  //指定导出打包文件的路径
    },
    plugins: [      //插件模块
        new HtmlWebpackPlugin({   //然后在插件模块里面使用一下
            template: path.join(__dirname, "./public/index.html") //指定哪一个html文件作为展示文件
        })
    ],
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [
                    // 这三个loader顺序，是固定的
                    { loader: 'style-loader'}, // 将 JS 字符串生成为 style 节点
                    { loader: 'css-loader'},  // 将 CSS 转化成 CommonJS 模块
                    { loader: 'sass-loader'}  // // 将 Sass 编译成 CSS
                ]
            }
        ]
    }
}

//如果是生产环境下，添加区分代码，替换掉config里面的属性
if (env == "development") {
    config.mode = 'development'//这个是设置生产环境的标识
    config.output = {
        // filename: 'bundle.js',
        path: path.resolve(__dirname, './public')
    }
    // 本地服务器和热更新
    config.devServer = {
        port: '8888',
        contentBase: path.join(__dirname, './public'),
        hot: true
    }
}

module.exports = config;
```

#### babel是一款js的编译器
* react一般命名为.jsx 文件  一般浏览器是编译不了的，所以需要babel编译器
* @babel/preset-react 用于编译jsx代码
1、cnpm install @babel/core -D 
2、cnpm install @babel/preset-env -D 
3、cnpm install @babel/preset-react -D 
* 配置好之后，还不能直接使用，需要设置一个配置文件
* 配置文件也有很多种，举例一种：在项目根目录新建一个为.babelrc的文件，文件名只能这样写
```
//在.babelrc文件中加入以下代码
//是解析jsx文件的代码,是供babel.loaders使用的,一定需要配置
{
	"presets" : ["@babel/preset-react"]
}
```
* 然后终于可以配置babel-loader了
* 首先把babel-loader安装一下: cnpm install babel-loader -D
* 然后再在webpack.config文件中加入一条规则
```
//在webpack.config.js文件中
module: {
    rules: [
      // 第一条规则
      {
        test: /\.(css|scss)$/,
        use: [
          // 这三个loader顺序，是固定的
          { loader: 'style-loader'}, // 将 JS 字符串生成为 style 节点
          { loader: 'css-loader'},  // 将 CSS 转化成 CommonJS 模块
          { loader: 'sass-loader'}  // // 将 Sass 编译成 CSS
        ]
      },
		// 第二条规则,新加入的规则，负责编译react文件，会直接指向前面编写的.babelrc文件
		// 然后执行react语法
      {
        test: /\.(js|jsx)$/,
		exclude: /node_modules/,  //这条命令是用于打包合成文件的时候忽略掉node_modules里面的js文件
        use: [
          { loader: 'babel-loader' }
        ]
      }
    ]
  }
```
#### 然后终于到了集成react的时候了
* 先安装react进来:cnpm install react -S
* 再安装一个react绑定:cnpm install react-dom -S  //这个类似于vue中的el绑定dom元素
* 首先，先在src文件夹下新建一个main.js文件，输入以下代码:
```
import React from 'react'   //引入React 虽然用不到 但是还是引进来
import ReactDOM from 'react-dom'  //引入ReactDOM,目的将渲染的文件挂载在html文件中

import App from './App.js'

// 用于把react组件渲染在app这个DOM节点
ReactDOM.render(<App />, document.getElementById('app'))

```
* 然后再在public目录里面新建一个index.html静态文件，里面创建一个id=app的元素进行挂载
```
// 输入以下代码
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>1916</title>
</head>
<body>
    <div id="app"></div>   //挂载app，最后渲染的页面
</body>
</html>
```
* 然后再回到src文件夹下，在main.js入口文件的同级目录下新建一个App.js作为被挂载的react文件
```
//在App.js中输入以下代码
import React from 'react'

// 第一个react组件
class App extends React.Component {
  // render定义了组件的DOM结构，使用JSX语法
  render() {
    return (
      <div>
        <h1>hello react 1916</h1>
        <h3>hello h3</h3>
      </div>
    )
  }
}

export default App
```
* 接下来就是直接npm start运行一下这个项目
#### 后面就是集成ESlint
* 首先安装ESlint,在命令行输入
```
cnpm install eslint -D
cnpm install eslint-loader -D  //eslint-loader是基于eslint进行创建的
```
* 然后在webpack.config.js文件中的开发环境进行配置
```
if (env == "development") {
    config.mode = 'development'
    config.output = {
        // filename: 'bundle.js',
        path: path.resolve(__dirname, './public')
    }
    // 本地服务器和热更新
    config.devServer = {
        port: '8080',
        contentBase: path.join(__dirname, './public'),
        hot: true
    }
    // 添加第三条loader规则
    config.module.rules.push({
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    enforce: 'pre',  //这里是进行前置处理，在问题发生之前就执行这条规则
    use: [
      { loader: 'eslint-loader' }
    ]
  })
}
```
* 然后由于需要配置ESlint的规则，需要在根目录下新建一个.eslintrc.json的文件进行配置,然后把以下代码复制进去
* 也可以使用package.json进行配置，具体看文档
```
{
  "parserOptions": {
    "ecmaVersion": 6,  //检测代码的规则是按照es6的代码规则进行检测
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true  //允许使用jsx的写法
    }
  },
  "rules": {
    "semi": 0  //这一行代码表示，如果代码后面没有加;号将会报错 0表示不报错 1表示黄色警告 2表示报红色错误 所以这里写0
  }
}
//然后就完成ESlint的集成啦
```
#### 附：如果webpack热更新有问题的处理方法,如果热更新没有问题就不用看这一栏
* 找到webpack.config.js进行以下配置
* 注意 注意 注意 官方提示，这个热更新处理方法只能在开发环境中使用，不能在生产环境中使用 所以记得放在if判断里面
```
//引入webpack，因为这个命令是webpack自带的,前提是一件本地安装了webpack
var webpack = require('webpack')

...代码ing

//在开发环境中加入以下代码
if (env==='development') {
	...代码ing
	config.plugins.push(new webpack.HotModuleReplacementPlugin())
}
```
* 然后在src文件夹下的main.js文件配置以下代码
```
// 解决热更新的问题
if (module.hot) {   //这个是判断是否在前面的webpack.config.js文件中是否使用了热更新
  module.hot.accept('./App.js', function() {   //监听这个文件App.js是否发生变化
    console.log('文件发生了变化')
    var NewApp = require('./App.js').default  //如果App这个文件发生变化，重新获取App这个文件然后在下面进行挂载
    ReactDOM.render(<NewApp />, document.getElementById('app')) //将App文件进行重新挂载
  })
}
```

#### 然后继续处理图片传输的问题，图片加载也需要Loader
* 首先先在webpack官网找到fileLoader进行安装:cnpm install file-loader -D
* 找到webpack.config.js文件进行再次配置
```
// 第三条规则
rules: [
		  {
			test: /\.(png|jpg|gif)$/,
			use: [
			  { loader: 'file-loader'}
			]
		  }
	  ]
```

* 为了能设置像Vue一样的@绝对路径，可以找到webpack.config.js文件
```
var config = {
	mode:"production",
	...代码
	resolve: {
		alias:{  //配置一个路径,然后可以用@直接访问到
			"@":path.resolve(__dirname, "./src")
		}
	},
}
```

#### 附JSX的解释，为什么JSX能显示为HTML格式
* Babel会将JSX语法进行编译：如下
```
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```
* 编译成以下代码,供浏览器解析,是react组件和react元素
```
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

#### 正确的使用react：
* 引入方式有两种：第一种
```
import React, { Component } from "react"  //引入React的同时，引入Compnent模块 然后在下面就不用写React.Component了

class HelloTest extends Component { //少写一步React.Component,可以直接用Component
    toggle(res){
        let num = "这是未修改之前的模样"
        if (res) {
            num = "还真能改"
        } else {
            num = "我是谁，我在哪，我在干嘛"
        }
        return num 
    }
	//这里属于JS代码区也可以设置参数
    render(){
        let flag = true
		//这里也可以写js代码，但是下面return里面就要直接参加渲染了
        return (
            <div>
                <h1>{ this.toggle(flag) }</h1>
            </div>
        )
    }
}

export default HelloTest
```
* 第二种就是更改上面两个地方而已
```
import React from "react"
class HelloTest extends React.Component {  //多写一个React.Component
```

* JSX就是一个对象，是一个变量
* 在JSX中，可以使用表达式
* 在JSX中，可以使用函数(返回值要求是JSX对象)
* 在JSX中，可以嵌套react元素(组件)

* React中，父组件给子组件传值，子组件全用this.props接收，包括方法和属性
* 父组件传值给子组件如果是属性就是直接传，如果是方法就是通过{}传
```
<TestJsx father="我是谁，我在哪" method={this.num}/>
//father是父级传给子级的属性，然后method是传过去的方法，和vue一样左边是子集接收的参数，右边是父级的
```
* 然后子组件接收的形式
```
<h3 onClick={this.props.method.bind(this)}> { this.props.father } </h3>
```
* 如果是子组件传值给父组件，则也是通过函数，传实参的方式:
```

```
* 构造器就是在对象实例化的时候执行，constructor，但是react帮我们实例了 我们就不用实例化了
* 一般会这样设置
```
class TestProps extends React.Component {
  // 构造器函数，此函数在类实例化时被调用
  constructor(props) {
    // 调用父类的构造器,只能放在第一行
    super(props)
  }
}
```
#### React绑定事件的方法是通过以下绑定方式进行绑定: 有三种写法
```
<button onClick={this.xxx.bind(this)}>点击</button>
//其中注意要用{}号进行包裹。而且后面需要加上.bind(this)来说明函数的this指向为当前类
//第二种写法是直接使用箭头函数,也能保证this的指向是当前类
<button onClick={()=>this.xxx()}>点击</button>
```
```
//还有一种是将事件绑定在constructor里面进行调用
constructor(props){
	super(props)
	this.xxx = this.xxx.bind(this)
}
//然后再在render里面进行渲染
render(){
	return (
		<div>
		    <button onClick={this.xxx}></button>  //然后就可以直接用this调用这个事件了
		</div>
	)
}
```
* 获取React里面的事件对象，多出来的那个形参就是event事件对象
```
eventTag(a,b,e){  //多出来的e就是事件对象
     console.log(a,b)
     console.log("e",e)
}

render(){
	return (
		<div>
			<button onClick={this.eventTag.bind(this,"第一个参数","第二个参数")}>点击按钮测试事件对象</button>
		</div>
	)
}
```
```
//如果用箭头函数进行传递事件对象则是如下方法:
eventTag2(e,a,b){
        console.log(a,b)
        console.log("e",e)
    }
...代码
<button onClick={(e)=>this.eventTag2(e,"22","33")}>第二个测试箭头函数</button> //不限制位置，但是要在前面的括号声明一下
```
* 阻止事件冒泡，还有阻止默认事件采取以下方法
```
num(e){
	e.preventDefault()
	e.stopPropagation()
}
```
* React也有声明式变量，在constructor里面设置一个this.state里面声明:
```
//但是和Vue不一样的是，如果要改变State里面的声明式变量需要用到this.setState({msg:"hello world"})才能改变this.state里面的变量
constructor(props){
	super(props)
	this.state = {
		msg:"hello state"
	}
}
//然后在更改的时候使用this.setState方法进行更改
changeMsg(){
        this.setState({ msg:"hello 1916" })
    }
//再挂载函数进行执行
<h2 onClick={this.changeMsg.bind(this)}>{this.state.msg}</h2>
```

#### React的生命周期
```
componentWillMount(){
	console.log("React挂载之前")
}
componentDidMount(){
	console.log("React挂载之后")
	//和Vue一样，这里适合放置调接口的操作
	//还有定时器的调用
	this.timer = setInterval(()=>{
	      let t = Date.now()
	      this.setState({
	        time: moment(t).format('HH:mm:ss')  //预先在命令行安装cnpm install moment -D才能使用
	      })
	    }, 1000)
}
//下面这个生命周期很关键,可以控制this.State是否及时刷新
shouldComponentUpdate(){
	console.log("控制State是否能自主刷新")
}

componentWillUpdate() {
    console.log('State数据更新之前')
}
componentDidUpdate() {
    console.log('State数据更新之后')
}
componentWillUnmount() {
    console.log('整个React生命周期结束销毁之前')
    // 清除定时器
    // 清除一些比较占内存的长连接、缓存数据
    // 手动销毁定时器
    clearInterval(this.timer)
	}
```
* React也能像vue一样实现v-if切换，但是函数需要自己封装，常用的封装方法如下
```
constructor(props){
	super(props)
	this.state = {
		tips:true    //在声明式变量先声明一个变量
	}
}

change(){
        this.setState({tips:!this.state.tips})  //通过函数进行改变
    }

<h1 onClick={ this.change.bind(this) }>测试条件隐藏</h1>  //安装在元素上提供点击
       { this.state.tips && <h2>能显示第一行信息嘛</h2> }  //触发事件隐藏和显示
```
* React也能像Vue一样v-for循环出列表，不过也要自己封装方法:
```
constructor(props){
	super(props)
	this.state = {
		list:[
			{id:1,callname:"北京","温度":23},
			{id:2,callname:"南京","温度":25},
			{id:3,callname:"上海","温度":26},
			{id:4,callname:"广州","温度":24}
		]
	}
}

render(){
	return (
		<div>
			{
			    list.map(value => (   //用map循环
			        <div key={value.id}>
			           <span>{value.callname}</span>
			           <span>{value.温度}</span>
			        </div>
			                    ))
			                }
		</div>
	)
}
```
#### 因为要重新改变style，直接复制会浅拷贝，需要设置深拷贝 附ES6的两种深拷贝方法
* 第一种是利用ES6新语法Object.assign(a,b,...)
* 第一个参数a指的是后面的b或者更多的对象合并为a对象里面,实现深拷贝
```
let str = Object.assign({},this.state.nono)  //this,state.nono是一个对象，str是深复制后的对象
		str.fontSize = "200px"  //改变了str的属性
        this.setState({nono:str}) //然后重新赋值
```
* 第二种也是ES6语法，但是会在React里面的ESlint报错,需要更改ESlint，具体需要找资料
* 通过...语法实现深拷贝
```
let str = { ...this.state.nono}
        str.fontSize = "5px"
        this.setState({nono:str})
```

#### 在React里面分为受控表单和非受控表单两种：非受控表单和受控表单
* 非受控表单指的是表单的值变化与React本身毫无关系,无法通过react控制表单
* 然而非受控表单有两种获取input值的方法：原生的dom操作还有用ref控制
* 当然了，React是非常不推荐使用非受控表单的
```
getInput(){
        console.log(document.getElementById("input").value)  //第一种方法是直接使用Dom只是能获取到他的值
		console.log(this.refs.aaa.value)
    }
    render(){
        return (
            <div>
                <input type="text" id="input"/> //第一种方法直接通过DOM	
                <button onClick={this.getInput.bind(this)}>获取表单的值</button>
				<input type="text" ref="aaa"/>
            </div>
        )
    }
```
* 但是有一种表单的形式只能是非受控的，就是input的file文件上传
```
<input type="file"/>
```

* 受控表单指的是能被React控制的表单，例如input上面绑定一个this.state的属性
* 但是注意，input表单上绑定了一个this.state之外还需要绑定一个onChange事件用于双向绑定
```
changeInput(e){
	this.setState({kong:e.target.value})  //通过事件对象e.target.value拿到输入的信息返回给setState
}
//render部分:
<div>
	<input type="text" value={this.state.kong} onChange={this.changeInput.bind(this)}/>
</div>
```

#### 状态提升，用于解决组件之间的数据通信问题，是facebook工程师原创的react里原生的方法
* 作用原理就是，如果两个组件之间需要数据传播，找到他们共同的父组件，在父组件的State里面使用共同的参数
* 然后如果需要更改就直接通过事件通信修改就好了

#### 组合的复用，纯组合是有没有this.State状态的，但是能更好的复用整个组合
* 当你需要复用到你的组件的时候，最好的方法还是使用组合比较好，这也是官方推荐的用法，类似VUE的插槽
* 下面是组合之间的复用:同一目录下的三个文件
```
//子组合children2直接使用function并抛出即可
import React from "react"

function Children2 (){
    return (
        <div>
            <h2>我是一个children2</h2>
        </div>
    )
}

export default Children2
```
```
//然后用他们共同的父级引入，实现包裹关系
import React from "react"
import Children1 from "./Children1"   //引入两个子组合进行测试
import Children2 from "./Children2"

class Father extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    
    render(){
        return (
            <div>
                <Children1>
                    <Children2 />  //children2是被包裹在children1里面的组合
					<h2>测试能不能展示其他内容</h2>
                </Children1>
            </div>
        )
    }
}

export default Father
```
```
//然后再在children1当中展示出包裹的内容，注意不单单可以展示children2还可以展示其他包裹在里面的内容
import React from "react"

function Children1 (props){  //不管是组合间引入还是继承组合一起引入，都需要引入一个参数props负责接收展示包裹的内容
    return (
        <div>
            <h1>测试</h1>
            {props.children}  //这个就是展示包裹内容的代码，能展示全部包裹的内容
        </div>
    )
}

export default Children1
```
* 当然了，为了代码组件更好的复用，纯组合还是可以参入到组件里面的
```
//这样也能进行正常展示
import React from "react"

class Children1 extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return (
            <div>
                <h1>测试</h1>
                {this.props.children}
            </div>
        )
    }
}

export default Children1
```

#### React的路由系统也不是React本身的，是另一方制作出来，所以需要用到路由也要引入这个路由组件
* react的这个路由组件可以上gitHub官网搜索react-router找到react官方gitHub仓库进行进入官网
* 如下地址:[](https://reacttraining.com/react-router/web/guides/quick-start)
* 安装router有两种方式:1、cnpm install react-router -S 这种安装方式是安装React本身，并不是我们需要使用的React的Web版本
+ 					 2、cnpm install react-router-dom -S 所以就是使用react-router-dom的安装方式，适用于web上
* router不仅能用于Web开发，还能用于APP开发
* router的基本用法如下：
* 1、首先需要在App.js中引入HashRouter或者是BrowserRouter来确定是哪种模式，地址栏有无#号，然后用标签将需要用到路由的模块进行包裹
```
import React from 'react'
import Home from "./components/Home/Home"
import { HashRouter } from "react-router-dom"

// 第一个react组件
class App extends React.Component {
  render() {
    return (
      <HashRouter>  // 用HashRouter包裹在最外面,里面的内容就全都能使用路由跳转
        <div>
          <Home />
        </div>
      </HashRouter>
    )
  }
}

export default App
```
* 2、需要NavLink和Route对应使用，NavLink负责跳转，Route负责展示页面效果
* 这里注意可以使用函数封装遍历数组返回值用{}展示在页面上变成多个NavLink列表，但是在{}中展示的函数形式不能用bind绑定this指向，不然会报错
```
import React from "react"
import "./style.scss"
import Logo from "./Logo/Logo"
import { NavLink, Route } from "react-router-dom"   //引入关键性标签NavLink和Route
import Router from "../../router"

export default class Home extends React.Component {

    constructor(props){
        super(props)
        this.state = {

        }
    }

    changeLink(){   //封装一个函数用于展示NavLink标签
        let node = []
        Router.map(value=>{  //利用map遍历数组进行列表展示，但是map不能改变原数组 所以需要新建一个数组push进去
            node.push(
                <div key={value.id}>
                    <NavLink to={value.path}>{value.text}</NavLink>
                </div>
            )
        })
        return node //最后返回这个数组给到函数，再由{}编译出来
    }

    changeView(){  //封装一个函数用于展示Route标签
        let node2 = []     
        Router.map(value=>{  
            node2.push(
                <div key={value.id}>
                    <Route path={value.path} component={value.component}></Route>
                </div>
            )
        })
        return node2
    }

    render() {
        return (
            <div className="BigHome">
                <div className="Hometitle"></div>
                <div className="Homecontent">
                    { this.changeView() }  //最后展示在页面上
                </div>
                <div className="Aside">
                    <Logo></Logo>
                    <NavLink to="/jsx">测试一下</NavLink>
                    { this.changeLink() }  //最后使用的时候注意函数不能使用this.changeLink.bind(this)的形式，不然会报错
                </div>
            </div>
        )
    }
}
```
* 上面的函数其实是有很大的复用性的，可以再精简一下
```
import React from "react"
import "./style.scss"
import Logo from "./Logo/Logo"
import { NavLink, Route } from "react-router-dom"
import Router from "../../router"

export default class Home extends React.Component {

    constructor(props){
        super(props)
        this.state = {

        }
    }

    changeAll(flag){  //将两个函数合成一个函数，用传入的参数来区分执行NavLink或是Route
        let node = []
        if (flag == 1) {
            Router.map(value=>{
                node.push(
                    <div key={value.id}>
                        <NavLink to={value.path}>{value.text}</NavLink>
                    </div>
                )
            })
        } else {
            Router.map(value=>{
                node.push(
                    <div key={value.id}>
                        <Route path={value.path} component={value.component}></Route>
                    </div>
                )
            })
        }
        return node
    }

    render() {
        return (
            <div className="BigHome">
                <div className="Hometitle"></div>
                <div className="Homecontent">
                    { this.changeAll(2) }
                </div>
                <div className="Aside">
                    <Logo></Logo>
                    <NavLink to="/jsx">测试一下</NavLink>
                    { this.changeAll(1) }
                </div>
            </div>
        )
    }
}
```
* 附一个Redirect重另向组件，负责输入其他网站的时候切换跳转网页
```
//首先，先在代码的最上面引入这个Redirect组件
import { NavLink, Route, Redirect } from "react-router-dom"

//然后直接把重另向，一般把重另向放到列表的最下面，就可以当页面输入其他地址的时候进行重新另向
<Redirect from="/*" to="/Hello"></Redirect> 
```

* 附一个Switch组件，作用就是将列表套在Switch组件里面，就只会匹配列表中的一个Route，而不会多个Route叠加
* 千万注意 千万注意 千万注意 Switch组件里面只能包裹Route 不能容纳其他标签
* 换句话说就是Switch是Route的直接父组件，不能是其他的
```
//在代码上面同时引进Switch组件
import { NavLink, Route, Switch } from "react-router-dom"
...代码

//然后将显示页面的Route列表包裹起来，使用方法就是这么简单
<Switch>
     { this.changeAll(2) }
</Switch>
```

* 附安装ant Design的方法，是一款属于React的UI组件库
* 首先打开官网，在命令行输入命令进行安装:
* cnpm install antd -S
* 然后因为需要用到Ant Design的CSS样式，所以将样式文件引入至入口文件main.js里面就好
```
import 'antd/dist/antd.css'; 
```
* 然后当你需要用到一些组件的时候再局部引入，需要用到什么就引入什么
```
// 例如引入Icon标签
import { Icon } from "antd"
...代码
Router.map(value=>{
                node.push(
                    <div key={value.id}>
                        <Icon type="area-chart" />  //只是多加了这一行代码，这个标签可以去官网点击标签就能获取自动复制
                        <NavLink to={value.path}>{value.text}</NavLink>
                    </div>
                )
            })
```
* 如果想要自定义设置UI组件的CSS样式也是可以的，在页面中打开找到关于当前组件的标签进行设置
```
//还是很容易找到的
&>.nono{
            &>i{
                margin-right: 10px;
            }
        }
```
#### 路由跳转的第二种形式，类似于Vue的编程式路由跳转，利用了this.props.history.push这个api进行设置
* 注意 注意 注意 react的编程式路由跳转是需要有Route路由展示显示的才能进行跳转
```
jump(){
        this.props.history.push("/Lief")  //直接输入需要跳转的路由即可
    }
render部分:
<button onClick={this.jump.bind(this)}>点击跳转到其他页面</button>
//然后页面就会跳转到这个路由展示的页面对应的Route
```
* 如果需要路由传参则和Vue一样，在路由后面拼接字符串
```
jump(){
        let num = 123456
        this.props.history.push("/Lief/" + num)  //直接使用拼接字符串的方式传参
    }
```
* 然后跳转的页面使用this.props.match.parpams接收传递过来的参数，具体参数名由展示页面的Route决定
* 也就是说还需要在Route上面想Vue一样设置一个名字才能传递成功
```
{
        id:5,
        path:"/Lief/:id",  //就是接收的地址后面加个冒号再新建名字
        component:ReactLief,
        text:"Lief",
        icon:"lief"
    },
```
```
//然后使用this.props.match.params.id接收
componentDidMount(){
	console.log(this.props.match.parmas.id)
}
```
* 当有这样一个需求，如果我想使用React的编程式跳转，但是我又想设置编程式跳转怎么办呢
* 这里我们需要用到Route的一个高阶语法
* 首先先进行命令行安装: cnpm install react-router -S
* 然后在所需要的页面中进行引入，并用withRouter函数进行包裹
```
import { withRouter } from "react-router" //先引进withRouter

class Logo extends React.Component {
    skip(){
        this.props.history.replace("/Hello") //需要进行包裹才能使用
    }
    render(){
        return (
            <div className="com-logo">
                <img src={ logo } alt="1916" onClick={this.skip.bind(this)}/>
            </div>
        )
    }
}

export default withRouter(Logo) //然后用witchRouter函数包裹class类进行抛出即可，就能使用到编程式路由的this.props.history等
```

React脚手架上使用swiper
bejson能够格式化json数据
react-router 找到gitHub官网搜索
router不但可以用于web开发,还能用于APP开发
cnpm install react-router-dom -S 安装web路由
dva React脚手架
React的UI库 Ant Design
安装 cnpm install antd -S
* 路由的精确匹配 exact