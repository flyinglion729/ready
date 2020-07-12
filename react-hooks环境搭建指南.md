## hooks语法精解  (注意 Hooks是react16.8版本之后才有的新特性，要下载最新的react才有)
#### useState
* useState相当于给无状态组件添加状态state,用法也是很简单
* const [state,setState] = useState(初始值)  //其中state就是使用的变量值，setState就是修改这个变量值的固定方法
* 使用的时候直接在里面加值即可，注意 这个操作也是异步的，而且本能的会刷新整个方法，实现更新状态
* 注意：这里有个坑就是，useState不能嵌套在if或者for语句中，只能在最外层，不然会出bug，建议放在所有代码的最上面
* 注意：一定要注意顺序，每次渲染的时候顺序都是从上至下的
```
import React,{useState} from 'react'  //从react引入useState

export default function Test() {
    const [one,setOne] = useState(0)
	const [two.setTwo] = useState("asd") //多个state也是可以的，
    return (
        <div>
            <h2>{one}</h2>
            <button onClick={()=>setOne(one + 1)}>点击添加</button>
        </div>
    )
}
```
#### useEffect
* 如果说useState这个方法是为了解决无状态组件添加一个状态，那么useEffect就是为无状态组件添加一个生命周期
* useEffect这个Hooks能提供componentDidMount、componentUpdata、componentWillUnmount这三个生命周期的实现
* 当然这是官方说法，个人认为还提供了之前react没有的但是Vue有的一个watch功能，就是监听某一个值的变化而刷新页面
* 所以useEffect真是一个很强大的Hooks
* useEffect接收两个参数，第一个参数是一个函数，里面写代码逻辑，如果在里面加上return 返回一个函数，
* 这个return 回来的函数里面就表示componentWillUnmount执行
* 如果第二个参数不写，useEffect第一个参数里的函数所表示的就是componentUpdata，并且会在组件加载的时候执行一次
* 如果第二个参数写一个[]，则表示componentDidMount，在页面加载的时候执行一次
* 如果第二个参数写一个[xxx,yyy]，则表示vue里面的watch方法，当xxx或者yyy发生改变的时候会重新渲染一遍，当然在组件第一次加载的时候也会执行一次
```
useEffect(()=>{
	这里面表示componentUpdata生命周期，在页面加载也会执行一次，然后任何useState里的值发生更改也会刷新
	return ()=>{
		这里面表示是componentWillUnmount执行的周期，表示组件的卸载
	}
})

useEffect(()=>{
	这里面表示componentDidMount生命周期，只在页面加载完毕的时候执行一次
	return ()=>{
		这里面表示是componentWillUnmount执行的周期，表示组件的卸载
	}
},[])

useEffect(()=>{
	这里表示当xxx或者yyy发生改变的时候才会发生渲染，并且在组件第一次加载完成的时候也会渲染一次
	return ()=>{
		这里面表示是componentWillUnmount执行的周期，表示组件的卸载
	}
},[xxx,yyy])
```
#### useContext
* 其实大多数问题，上面两个Hooks都能解决了，useContext这个Hooks就类似react原本的上下文context一样，可以理解为父组件向下传递值
* 当然也可以用过props,但是这个useContext可以实现父传孙子，可以把useContext这个Hooks理解成一个组件，组件里面的所有组件都能使用这个值
* 这个Hooks分为两个：1.createContext 这个是创建一个上下文对象，本质上可以理解成一个组件，实例出来之后可以通过createContext().Provider
* 里面的value属性将值进行传递
* 2.useContext就是将上面传递下来的值进行接收，很容易理解
* 并且，当父组件更改传递的value值时，子组件也同步发生改变，当时子组件是无法更改value值的 只能获取
```
import React,{useState,createContext,useContext} from 'react'

const Context = createContext()  //注意 这里有个神坑，就是创建出来的Context不能放在函数里面，要放在外面

function Son(){
  const num = useContext(Context)
  return (
    <>
      <h2>查看一下是不是父组件传值</h2>
      <div>{num}</div>
    </>
  )
}

export default function Test() {
  const [getYou,setGetyou] = useState(0)
  return (
      <>
        <h2>这是一个父组件给子组件共享的示例</h2>
        <button onClick={()=>setGetyou(getYou + 1)}>点击增加</button>
        <div>{getYou}</div>
        <Context.Provider value={getYou}>  //然后把放在函数外面的Context.Provider绑定在组件中，然后里面的value属性进行传值
          <Son />  //下面的所有子组件都能获取到这个getYou这个值，并且 当父组件更改这个值的时候会同样发生改变
        </Context.Provider>
      </>
  )
}
```
#### useReducer
* 理论上来说useContext加上useReducer就能实现redux的效果了，下面是简单介绍useReducer的基本用法
* useReducer接收两个参数，第一个参数是一个方法，里面存放的类似reducer一样的方法，第二个值是第一个参数里方法中的state的初始值
* useReducer能像useState一样解构出来，解构出来的数组，第一个值就能变量，能直接供使用，第二个值是dispatch是触发action方法改变state的方法
* 使用方法和redux的dispatch一样
```
import React,{useReducer} from 'react'

export default function Test() {
	//解构出来的两个值，第一个num能直接进行使用，第二个dispatch和redux一样，通过触发useReducer方法里面的action方法进行更改state
  const [num,dispatch] = useReducer((state,action)=>{  //第一个参数是一个方法，类似reducer
    switch (action) {
      case "add":
        return state + 1
      case "sub":
        return state - 1
      default:
        return state
    }
  },0) //第二个参数是初始值，可以理解成state的初始值，也能理解成解构出来的num
  return (
      <>
        <h2>查看useReducer怎么使用</h2>
        <div>{num}</div>
        <button onClick={()=>dispatch("add")}>计数器增加</button>
        <button onClick={()=>dispatch("sub")}>计数器减少</button>
      </>
  )
}

```
#### useContext + createContext + useReducer实现redux功能
* 上面了解到各个Hooks的作用之后，下面是综合应用，实现redux功能，实现各组件的无障碍使用公共值
* 简单来说就是创建一个组件，在该组件中使用createContext将使用useReducer创建出来的state和dispatch传递下去，给各个子组件
* 然后子组件通过useContext接收并且使用其中的state或者dispatch更改state，实现各组件之间无障碍交流
* 下面是简单的目录结构，其中color为创建createContext的主要组件，One和Two分别为使用redux的子组件
test--
	  |--color--
			   |--index.jsx
			   
	  |--one--
			  |--index.jsx
			  
	  |--two--
			  |--index.jsx
			  
	  |--index.jsx
* 然后先在color文件中创建出redux的大体框架
```
//color文件下
import React,{createContext,useContext,useReducer} from 'react'

export const CreateColor = createContext()

export const CHANGE_COLOR = "CHANGE_COLOR"  //后续这个变量也是可以放到外面去的

const reducer = (state,action)=>{  //创建出一个reducer方法，这个方法后续可以优化成一个文件
  switch(action.type){
    case CHANGE_COLOR:
      return action.color
    default:
      return state
  }
}

export function Color(props) {
  const [state,dispatch] = useReducer(reducer,"blue") //创建useReducer供后面使用
  return (
    <div>
      <CreateColor.Provider value={{state,dispatch}}> //然后传递下去
        {props.children}
      </CreateColor.Provider>
    </div>
  )
}
```
* 然后在test的index.jsx文件中进行引入
```
//text的index.jsx文件下
import React,{useReducer} from 'react'
import {Color} from "./color"
import One from "./one"
import Two from "./two"

export default function Test() {
  
  return (
      <>
        <Color>
          <One />
          <Two />
        </Color>
      </>
  )
}

```
* 最后分别在one和two文件中使用到redux
```
//one
import React,{useContext} from 'react'
import {CreateColor} from "../color"

export default function One() {
    const {state:color} = useContext(CreateColor)
    return (
        <div>
            <h2 style={{color}}>这就是即将改变的字体颜色</h2>
        </div>
    )
}
//two
import React,{useContext} from 'react'
import {CreateColor,CHANGE_COLOR} from "../color"

export default function Two() {
    const {state,dispatch} = useContext(CreateColor)
    return (
        <div>
            <button onClick={()=>dispatch({type:CHANGE_COLOR,color:"yellow"})}>点击变黄色</button>
            <button onClick={()=>dispatch({type:CHANGE_COLOR,color:"green"})}>点击变绿色</button>
        </div>
    )
}
```
#### useMemo
* 在原始的react中为了防止父组件修改某个变量导致子组件也跟着重复渲染，会有shouldComponentUpdata来提升性能，这是至关重要的，
* 因为如果一个组件多次渲染会严重耗费性能，如果整个子组件还需要调取接口就更慢了
* 所以为了解决以上问题，引入了一个useMemo来解决Hooks重复渲染子组件中的方法
* 用法类似useEffect，但是相比useEffect 是没有return的，用法更加语义化
* 注意 仅限于已经使用的方法，没有使用的方法是不会重复渲染的
```
import React,{useState,useMemo} from 'react'

function Son({sonName}){
  function ChangeName(name){
    let time = new Date().getTime()
    return time + name + ""
  }

  let getName = useMemo(()=>ChangeName(sonName),[sonName])  //用法和useEffect一样，只有当sonName更改之后才会触发，避免多次渲染
  let testChange = ()=>{
    console.log("这是啥")
  }

  return (
    <>
      <h2>这是小陈{getName}</h2>
      <button onClick={()=>{testChange()}}>测试一下子组件不使用的话会不会重复渲染</button> //但是没使用的方法是不会重复渲染的
    </>
  )
}

export default function Test() {
  const [sonName,setSonName] = useState("小陈")
  const [monName,setMonName] = useState("陈妈")

  return (
      <>
        <h2>这是陈妈：{monName}</h2>
        <button onClick={()=>setSonName(new Date().getTime(),sonName)}>增加小陈时间</button>
        <button onClick={()=>setMonName(new Date().getTime(),monName)}>增加陈妈时间</button>
        <Son sonName={sonName}></Son>
      </>
  )
}
```
#### useRef
* 这个Hooks是能赋予无状态组件拿到真实的DOM，而且有两个特性，获取DOM的同时还能赋值
* 但是这个和useState不一样的地方在于，useRef没有useState那样修改之后刷新页面，是通过useRef出来的.current来获取的
```
import React,{useRef,useState,useEffect} from 'react'

export default function Wing() {
    const [num,setNum] = useState("这是啥")
    const control = useRef(null)
    
    useEffect(()=>{
        control.current = num
    },[num])
    // ref={control} value={num}
    return (
        <div className="wing">
            <input type="text" value={num} onChange={(val)=>setNum(val.currentTarget.value)}/>
            <h2>这一栏是useState{num}</h2>
            <h2>这一栏是useRef{control.current}</h2>
        </div>
    )
}
```

## 首先先安装react的官方脚手架
* cnpm install -g create-react-app  //这一步是和之前的react一样的

## React生成条形码
#### 前端是通过引入一个插件jsbarcode生成条形码
* 首先先下载这个插件cnpm install isbarcode -s
* 然后在页面中进行引用
```
import React,{useState,useEffect,useRef} from 'react'
import JsBarcode from "jsbarcode"

export default function Test() {
  const getCode = useRef(null)
  useEffect(()=>{
    todoJsBarcode()
  },[])

  const todoJsBarcode = ()=>{
    JsBarcode(getCode.current, "1515151", {
      text: "显示文案",
      format: "CODE39",
      displayValue: true,  //这个选项是是否在条形码下方显示文字
      width: 2.0, //较细处条形码的宽度
      height: 100,//条形码的宽度，无高度直接设置项，由位数决定，可以通过CSS去调整，见下
	  quite: 10,
      margin: 0,
    });
  }

  return (
    <>
      <svg  //注意 这里是要放svg的 或者Img
      ref={getCode}
      >
      </svg>
    </>
  )
}
```
* 其中JsBarcode的各个参数表示内容
```
format（选择要使用的条形码类型）	"auto" (CODE128)	String
width（设置条之间的宽度）	2	Number
height（高度）	100	Number
displayValue（是否在条形码下方显示文字）	true	Boolean
text （覆盖显示的文本）	undefined	String
fontOptions（使文字加粗体或变斜体）	""	String
font（设置文本的字体）	"monospace"	String
textAlign（设置文本的水平对齐方式）	"center"	String
textPosition（设置文本的垂直位置）	"bottom"	String
textMargin（设置条形码和文本之间的间距）	2	Number
fontSize（设置文本的大小）	20	Number
background（设置条形码的背景）	"#ffffff"	String (CSS color)
lineColor（设置条和文本的颜色）	"#000000"	String (CSS color)
margin（设置条形码周围的空白边距）	10	Number
marginTop（设置条形码上方的空白边距）	undefined	Number
marginBottom（设置条形码下方的空白边距）	undefined	Number
marginLeft（设置条形码左边的空白边距	undefined	Number
marginRight（设置条形码右边的空白边距）	undefined	Number
flat	false	Boolean
valid	function(valid){}	Function
```
## 附用React打印页面
#### 使用window.print()这个值既可以弹出打印框
* 整个过程理解是，将需要打印的内容放在一个元素里，然后通过节点克隆一个一模一样的，然后再此基础上修改css的行间样式
* 因为直接将元素塞进另一个页面会丢失css，除非是行间样式
* 然后启动window.open()弹窗，再恢复css(因为如果使用动态修改css样式的话原本的元素也会修改，所以要变回来)
* 最后打开window.print()
* 总体代码如下
```
import React,{useState,useEffect,useRef, cloneElement} from 'react'
import JsBarcode from "jsbarcode"

export default function Test() {
  const getCode = useRef(null)
  const getCopy = useRef(null)
  const [codeText,setCodeText] = useState("7777777")
  const [getStyle,setGetStyle] = useState({})
  const [text,setText] = useState("表单内容实例")
  useEffect(()=>{
    todoJsBarcode()
  },[])

  const todoJsBarcode = ()=>{
    JsBarcode(getCode.current, codeText, {
      text: "显示文案",
      format: "CODE39",//选择条形码的类型"auto" (CODE128)
      displayValue: true, //（是否在条形码下方显示文字）
      width: 2.0,
      height: 100,
      quite: 10,
      margin: 0,
      lineColor:"#000"//条形码颜色
    });
  }

  const open = ()=>{
    let wind = window.open("","打印页面", `height=300, width=700, 
    top=100, left=100, toolbar=no, menubar=no, scrollbars=no, 
    resizable=no,location=n o, status=no`)
    setGetStyle({position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)"})
    setTimeout(()=>{  //注意 这里因为useState是异步的 所以会导致一个顺序问题
      let agoNode = getCopy.current.cloneNode(true) //克隆一次
      wind.document.body.innerHTML = getCopy.current.innerHTML;
      setGetStyle({})
      wind.print()
    },0)
  }

  return (
    <>
      <button onClick={()=>open()}>打印按钮</button>
      <section ref={getCopy} style={{}}>
        <div style={getStyle}>1fgdfggfgf
          <svg
          ref={getCode}
          >
          </svg>
          <div style={{}}>
            <h4>表单内容：{text}</h4>
          </div>
        </div>
      </section>
    </>
  )
}

```
## React反向代理
* 做反向代理的主要目的是为了解决跨域问题，而且方便日后调用接口
* 首先在npm包先下载一个反向代理模块 npm install http-proxy-middleware -S
* 然后在src文件夹下新建一个名字为setupProxy.js的文件，然后输入以下代码
```
const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app) {
    app.use('/chun', 
    createProxyMiddleware({ 
        target: 'http://192.168.1.106:8080', //这里写代理的网站
        changeOrigin: true, 
        pathRewrite:{
            "^/chun":"/" //将/api更换成/
        } 
      }
    ));
    app.use('/city', 
    createProxyMiddleware({ 
        target: 'https://c.y.qq.com', //这里写代理的网站
        changeOrigin: true, 
        pathRewrite:{
            "^/city":"/" //将/api更换成/
        } 
      }
    ));
}
```
* 然后在src文件夹下再新建一个utils文件夹，用来存储自己封装的方法
* 在utils文件夹下新建一个fetch.js，先将axios进行封装
```
//fetch.js
import axios from "axios"

var server = axios.create({
    baseURL:"/chun",
    timeout:5000
})
axios.defaults.headers.get['Content-Type'] = "application/json"
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//请求拦截器
server.interceptors.request.use((config)=>{
    console.log("请求拦截器")
    return config
})
//响应拦截器
server.interceptors.response.use((res)=>{
    return res.data
})

export default server
```
* 然后再在同目录下，也就是utils目录下再新建一个api.js用来存放接口
```
import api from "./fetch"  //引入已经封装好的axios文件
import qs from "qs"
//注册接口名字
// export const register = (params)=>{
//     return axios.get("/register",{params}) //然后发送数据请求
// }
//注册接口名字
//注册
export const register = (params)=>{
    return api.post("/register",qs.stringify(params))
}

//登录
export const login = (params)=>{
    return api.post("/Login",qs.stringify(params))
}

```
* 然后就可以在组件中进行正常调用了
```
import React, { useState } from 'react'
import { UserOutlined ,InsertRowBelowOutlined} from '@ant-design/icons';
import { Input,Button } from 'antd'
import "../home/home.css"
import {login} from "../../utils/api"
import md5 from "md5"

export default function Login() {
    const [username,setUserName] = useState("")
    const [password,setPassWord] = useState("")
    const [loading,setLoading] = useState(false)
    function input(text,e){
        switch(text){
            case "user":
                setUserName(e.currentTarget.value)
                break;
            case "pass":
                setPassWord(e.currentTarget.value)
                break;
        }
    }

    function goRegister(params){
        login(params).then((res)=>{
            console.log("数据",res)
            if (res.code === 4001||res.code === 50001) {
                window.alert(res.msg)
                return
            } else if (res.code === 200) {
                window.alert(res.msg)
                return
            }
        }).catch((res)=>{
            window.alert("数据获取失败",res)
        })
    }

    function submit(){
        if (!username.trim()||!password.trim()) {
            alert("账号密码不能为空")
            return
        }
        let params = {
            username,
            password:md5(password)
        }
        goRegister(params)
        setUserName("")
        setPassWord("")
    }
    return (
        <div className="home">
            <div className="username">
                <Input size="large" value={username} onChange={(e)=>input("user",e)} placeholder="请输入用户名" prefix={<UserOutlined />} />
            </div>
            <div className="password">
                <Input size="large" value={password} onChange={(e)=>input("pass",e)} placeholder="请输入密码" prefix={<InsertRowBelowOutlined />} />
            </div>
            <div className="buttom">
                <Button type="primary" loading={loading} onClick={()=>submit()}>提交</Button>
            </div>
        </div>
    )
}

```
## 前端处理Blob对象数据
* 对于Blob的网上官方说法是
```
一个Blob对象就是一个包含有只读原始数据的类文件对象。Blob对象中的数据并不一定得是JavaScript中的原生形式。
File接口基于Blob，继承了Blob的功能,并且扩展支持了用户计算机上的本地文件。
```
* 简单来说，由于前端也就是JS一直以来都没有较好的可以直接处理二进制数据的方法，所以Blob的出现，让我们可以通过
* JS直接操作二进制数据，也就是Blob
* Blob对象可以看做是存放二进制数据的容器，另外还可以通过Blob设置二进制数据的MIME类型




















## MIME类型
* MIME类型是一种文件类型，服务器通过MIME类型可以告知浏览器需要处理的文件属于哪一类
* 常用的MIME类型一级分类
```
text    		普通文本
image   		某种图像
audio   		某种音频
video  			某种视频文件
application  	应用数据(一般后端普通数据就是这种格式)
multi-part      复合内容
```
* 常用的MIME类型二级分类
```
audio/wav       wave音频流
audi/webm       webm音频文件格式
...
```