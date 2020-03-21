create kongLee by 2019/12/30
## Vue的安装初始化
Vue有两种安装方式
* 在官网找到CDN的地址，用script引入
* 用vue脚手架工程化安装
* 附淘宝镜像:npm install -g cnpm --registry= https://registry.npm.taobao.org
## Vue的脚手架搭建指南
#### 如果第一次在电脑上使用vue，需要安装全局命令
```
npm install @vue/cli -g  
//或者不是npm包管理器就用以下命令
yarn global add @vue/cli

```
* 安装好全局的Vue之后，就可以在你想要的文件夹下搭建脚手架了
```
vue create vue-project
//其中vue-project是项目名，可以自行修改
```
* 在搭建好Vue脚手架之后，需要安装pack里面的内置模块，并且可以启动了
```
npm install
//将需要用到的模块进行下载
npm run serve  或  npm start
//然后启动服务器 npm start这个命令需要在package.json里面修改
```
* 注意：为了方便启动项目，在package.json里面设置一下启动命令
```
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "start": "npm run serve"   //就是加一行代码进行调用
  },
```
* 还有一个不常用的命令，用于修正ESlint规则的命令
```
npm run lint
```
* 当项目需要上线，对编程的文件进行打包，会用到以下的命令
* 执行命令之后会生成一个dist文件，把这个文件夹发给运维就可以了，我们自己也可以将这个文件夹放入public服务器静态文件夹下进行打开
* 其中dist文件夹下有一个.map后缀的文件，是静态资源映射关系的配置文件
```
npm run build
```

#### ESLint，Vue脚手架自带的编程规则，
* ESlint官网：(https://eslint.bootcss.com/)
* ESlint主要功能时规范化每个用Vue的方法，不然代码难以管理
* 当你刚刚搭建Vue脚手架的时候，需要修改的一些规则，在package.json里面
```
"eslintConfig": {
	"rules": {
		"no-console": 0
	}
}
//这个代码是表示可以在Vue里面使用console.log进行调试，不会报错
//ESLint规则有三种管理方式：error-2 warn-1 off-0
```

#### 项目结构介绍
* `src` 开发目录
	* `src/main.js` 程序的入口文件
	* `src/App.vue` App组件
	* `scr/components` 组件目录
	* `src/assets` 程序的静态资源目录
* `public` 本地服务器的静态资源目录
* `dist`目录，执行`npm run build`所生成的目录

#### 单文件组件
#### [Vue单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)
* 为什么要使用单文件？有哪些优势？
* `<template></template>`放置HTML模板
* `<script></script>`放置js代码
* `<style></style>`放置样式代码
* 一个`.vue`文件就是一个组件

#### 安装sass文件
#### 使用 SASS

* [Sass官网](https://www.sass.hk/)
```
//  建议使用 cnpm 进行安装
cnpm install sass-loader -D
cnpm install node-sass -D
```
```
<style lang="scss" scoped>
	@import '@/assets/css/common.scss';
	.page {
	  > button {
	    font-size: $btnSize;
	    color: $color;
	  }
	  > div {
	    button {
	      color: $color2;
	    }
	  }
	  > .box1 {
	    .btn {
	      border: .03rem solid red;
	    }
	  }
	}
</style>
```
* 如果因为网络原因，node-sass安装失败，使用下面命令进行安装
```
npm install node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```
* [node-sass 安装失败报错的原因及解决办法(整理)](https://www.cnblogs.com/gitnull/p/10188030.html)
* [Less官网](http://lesscss.cn/)

#### 路由的搭建
页面分两种，单页面和多页面，单页面就是只有一个index.html文件，用路由进行跳转，转换组件来实现正式跳转
* 路由实现的SPA单页面程序

* 在使用路由之前需要先下载路由模块，并进行引用:
```
cnpm install vue-router -S
//路由的安装
```

```
//在src文件夹下创建一个router.js
import Vue from 'vue'
import VueRouter from 'vue-router'

import TodoList from '@/pages/TodoList.vue' //引入子组件
const TodoList = ()=>import("@/pages/TodoList.vue") //或者使用异步引入 推荐使用异步

Vue.use(VueRouter)
const router = new VueRouter({
  // mode: 'history',  // 切换VueRouter的路由模式 一般不用切换
  routes: [
    {
      path: '/todo',   // 当路由是 /todo时，渲染TodoList组件；下面的同理
      component: TodoList,
      name: 'todo'
    },
	{
		path:"/*",
		redirect: '/'
	}
	//设置路由的时候，为了防止输错页面，这样在最后设置当输错路由可以跳转至首页
	//路由的匹配是从上往下的，所以这个*号设置要放最后
  ]
})
export default router
//初始化路由，并抛出，让main.js挂载
```

```
//在main.js上进行挂载
import router from './router'

new Vue({
	router,
	render: h=>h(App)
}).$mount('#app')
```

* 路由的实现：使用'router-view'和router-link进行实现
```
<div class="navbar">
	<!-- 声明式路由 -->
	<!-- to 指定要跳转至哪个路由 -->
	<!-- tag 指定用什么HTML标签来替换渲染router-link -->
	<!-- activeClass 指定导航选项卡的高亮样式 -->
	<router-link to='/todo' tag='span' activeClass='on'>TodoList</router-link>
</div>

<!-- 在这里承载一级路由所对应的组件，在这里渲染一线路由所对应的组件 -->
<router-view></router-view>
<!-- <router-view name='geek'></router-view> -->
```

#### 视图的命名
###### 一般情况下router-view一个就够了，当然啦 你也可以指定多几个router-view,这个时候就有一个name属性
###### 默认情况下router-view的name值是default
```
//在app.vue文件里:
<template>
  <div id="app">
    
    <router-view name="aaa"></router-view>
    <router-view name="bbb"></router-view>
  </div>

</template>
//在路由文件router.js里:
routes:[
        {
            path:"/",
            components:{
                aaa:TodoList,
                bbb:Test
            }
        },
```

#### 路由跳转除了router-link声明式跳转，还有一个很重要的编程式跳转
#### 一般做导航菜单的时候才会用到router-link声明式的跳转
* 可以在函数中使用以下指令实现跳转:
```
methods:{
	change(){
		this.$router.push("/xxx") //需要跳转的路由
	}
}
//编程式路由还有其他两个方法:this.$router.replace()和this.$router.go(),和push不一样的是
//push是在$router栈数据里面推一个进去，replace不会新加一个而是直接进行替换
//go方法和window.history.go的方法类似，输入-1就是跳转到上一个路由，1就是下一个
```
 
 #### 路由跳转的同时还可以传参
 * router-link传参方式:
```
	<router-link to="/Music/123"></router-link> //传参方式为路由后面加上 /xx 的参数
	<br>
```
* 编程式路由传参:
```
methods:{
	change(){
		this.$router.push("/Music/123") //传参方式也一样 /xx 的参数
	}
}
```
* 然后就是在router.js总的路由模块下设置参数传递:
```
const router = new VueRouter({
    mode:"hash",
    routes:[
        {
            path:"/Music/:id",  //用 /:id  设置传参的接收中转
            component:Music
        },
        {
            path:"/*",
            redirect:"/"
        },
    ]
})
```
* 最后跳转到第二个页面之后的参数接收：用this.$route.params  //注意 接收用的$route是没有r的
```
<script>
export default {
    mounted(){
        console.log(this.$route.params)
    }
}
</script>

```

#### 在使用路由跳转的时候，不但能使用path，还可以自定义名字
* 在传参模块:
```
fun(){
          this.$router.push({name:"luck",params:{
              day:"2020/1/2",
              hour:"14:18"
          }})
      }
```
* 在router.js文件设置多一个name属性即可:
```
routes:[
        {
            path:"/date",
            component:Home,
			name:"luck"   //对应上面的luck
        },
```

#### 嵌套路由
切换组件的三种方法:
1、用v-show和v-if做切换和隐藏(但是会丢失数据)
2、用动态组件keep-alive
3、用嵌套路由
* 使用嵌套路由的时候router-link里面需要加上本来要跳转的路由还有他的子路由:
```
//注意：传参的时候也要把参数一起写进子路由
//千万注意：子属性路由path第一个不能加/
<div>
            <router-link to="/Lucky/:day/:hour">点击按钮跳转film</router-link>
            <br>
            <router-link to="/Lucky/:day/:hour/film2">点击按钮跳转film2</router-link>
</div>
//router部分:
{
            path:"/Lucky/:day/:hour",
            component:Lucky,
            children:[      //嵌套路由需要加上children属性,类似routes
                {
                    path:"",
                    component:film
                },
                {
                    path:"film2",  //不能加斜杠 不能加斜杠 不能加斜杠
                    component:film2
                }
            ]
        },
```
* 小知识点：router-link有几个属性 tag 属性能改变router-link的标签，exact-active-class 能动态改变当前被选中的router-link，其中exact是精准匹配的意思
* 小知识点:
```
router.push({ name: 'user', params: { userId }})  //name 只和params搭配 ,如果name 换成了path后面就不接params
router.push({ path: `/user/${userId}` })
```

## 附Element.ui的安装指南:
* 先在根目录下载element:
```
cnpm install element-ui -S
```
* 然后将以下代码放在main.js里面完成引入:
* 注意：代码重复的要删掉
```
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```
* 使用element.ui的布局时，由于子路由的影响，需要在最外层<el-container的style中加了style=" position: absolute;"
* 才能成功铺满整个页面

## 附Vuex安装指南:
* 1、安装 cnpm install vuex -S
* 2、在src根目录创建一个store.js 添加代码
```
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      count: 100,
      callname:"我是谁"
    },
    mutations: {
      add (state,payload) {
        console.log("state",payload)
        console.log(state)
        state.count += payload
      },
      changename(state,payload){
        state.callname += payload
      }
    }
  })

export default store
//其中state中的参数可以供所有组件使用，如果需要更改state里面的属性，必须通过mutations里面的方法进行更改
//不然无法触发Devtools
```
* 使用这个状态管理的方法有两种：
* 第一种是直接获取:
```
    <h1 v-text="$store.state.count"></h1>
	//this.$store.state.xxx获取到state里面的属性
	
	methods:{
	    add(){
	      this.$store.commit("add",10) 
		  }
	//如果需要更改则通过this.$store.commit("mutations里面的函数名",需要传过去的参数)
```
然后在store.js文件中:
```
mutations:{
	add(state,payload){
		state.count += payload
	}
}
//其中state这个参数就是store里面的state可以直接操作,payload是从其他组件传过来的参数
```
* 第二种方法：推荐使用简洁
```
//在用到其他状态管理的其他组件中
<script>
import { mapState, mapMutations, mapActions } from 'vuex'  // 映射
//其中mapState和mapMutations、mapActions都是尤雨奚封装的方法可以获取到store.js里面
//的state值和mutations还有actions值
export default {
  computed: {
    ...mapState(['count', 'msg', 'list']) //一定需要用到es6的...扩展运算符解构出来,然后就可以直接调用不需要加$store
	//相当于将里面的count msg list 变成同级的普通函数并返回
	//注意:state一定要放在计算函数里面
  },
  mounted() {
    // 调接口
    this.getMusic()
  },
  methods: {
    ...mapMutations(['add', 'sub']), //mapMutations和mapActions最好不要调换，因为层级关系的原因
    ...mapActions(['getMsgOfAjax', 'getMusic']),//同理mutations和Actions也需要用es6的扩展运算符
    addClick() {
      this.add(100)
    },
    subClick() {
      this.sub(50)
    },
    getMsg() {
      this.getMsgOfAjax()
    }
  }
}
</script>
```

#### Vuex里面可以通过actions获取接口
* actions里面是异步的，所有的后端接口都在这里封装
```
actions: {
    getMsgOfAjax(store) { //这个store参数加不加都可以
      setTimeout(()=>{
        store.commit('changeMsg', 'hello 1916')  //切记在actions里面使用mutations里面的方法需要用store.commit
      }, 1000)
    },
    getMusic(store) {
      var url = 'http://localhost:8080/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=61204160201852987&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=10&w=%E5%91%A8%E6%9D%B0%E4%BC%A6&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'
      axios.get(url).then(res=>{
        console.log('vuex- ---周杰伦的音乐列表', res)
        store.commit('changeList', res.data.data.song.list)
      })
    }
  }
```
* 获取接口需要axios的帮助:
* npm 安装一下axios:
```
npm install axios -S
注意这里最好用npm 因为这个axios用cnpm老是容易找不到文件
```
* 然后直接使用以下代码获取数据:
```
getMusic(store) {
      var url = 'http://localhost:8080/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=61204160201852987&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=10&w=%E5%91%A8%E6%9D%B0%E4%BC%A6&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'
      axios.get(url).then(res=>{
        console.log('vuex- ---周杰伦的音乐列表', res)
        store.commit('changeList', res.data.data.song.list)
      }).catch(err=>{
		  console.log("err",err)   //获取错误内容
	  }).then(()=>{
		  console.log("总会执行这一步")  //不管能不能调到接口，都会执行这一步
	  })
    }
```
* 但是，由于很多数据都是需要跨域获取，所以接下来要先配置好vue.config.js文件才可以跨域
* 重新开始第一步:在package.json同级的根目录下新建一个叫vue.config.js的文件(官方文档有介绍)
* 然后在文件里面配置好以下代码
```
module.exports = {
  // 配置本地服务的反向代理
  devServer: {
	port: 9090, //默认是8080,这个可以改端口号一般可以不用改
    proxy: {
      '/soso': {  //这一栏是当你访问的路由含有这段字符串后，会将你的IP地址转向下面的target的地址
        target: 'https://c.y.qq.com', //这里填写将要访问的目标地址,不包括后面的参数
        changeOrigin: true //默认填true,表示可以改变跨域的源
      }
    }
  }
}
```
* 然后再store.js文件里面引用
```
import axios from "axios"

actions:{
	getMusic(store){
	        var url ="http://localhost:8080/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=57716835706115881&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=10&w=%E5%91%A8%E6%9D%B0%E4%BC%A6&g_tk=825386419&loginUin=857086010&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0"
	        axios.get(url).then(res=>{
	          console.log(res)
	          store.commit("changelist",res.data.data.song.list)   //注意，修改store里面的state属性还是需要经过mutations的
	          console.log(store.state.list)
	        })
	      }
}
```

* 小知识点：dispatch和commit的区别,dispath含有异步操作:this.$store.dispatch('mutations方法名',值)
* commit是同步操作:this.$store.commit("mutations方法名",值)

#### 引入一个dev工具devtools
* 首先把devtools的安装包放在一个文件夹里
* 然后打开谷歌浏览器将扩展包放进去
* 最后在谷歌浏览器的f12中就能看到vue调试工具了，是专门为Vuex设计的

##  由于分组开发的缘故，store会被分为几个子组件，然后子组件引入进来的时候难免会发生参数名相同
#### 为了解决这个问题可以使用namespace命名空间进行自主命名 ： 公司常用的方法!!!
* 首先在src里面的根目录，也就是components的同级目录创建一个store的文件夹,里面再创建一个module的文件夹和一个index.js的文件
* module文件夹内存放各个需要用到的子组件，然后再全部引入到index.js文件里面
* 记得最后的index.js要在main.js上面进行挂载
```
//在index.js文件中配置
import Vue from "vue"
import Vuex from "vuex"

import first from "./model/first"
import second from "./model/second"
import three from "./model/three"    //这三个是子组件引入的,其他的为固定格式

Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        first,
        second,
        three
    }
})

export default store
```
```
//其他子组件举例:
const second = {
    namespaced:true,  //注意！ 注意！ 注意！ 这个namespaced一定要加，不然无法调用
    state:{
        node_msg:"The second",
        node_new:"The three"
    },
    mutations:{
        change(state, payload){
            state.node_msg = payload
        }
    }
}

export default second //最后记得抛出
```
* 然后在main.js里面挂载
```
import store from "./store/index";
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

```
* 然后在其他子组件中引用就变得方便很多了
```
<template>
  <div>
      <h2 v-text="node_ace"></h2>
      <h2 v-text="node_msg"></h2>
      <h2 v-text="node_new"></h2>
  </div>
</template>
<script>
import {mapState , mapMutations  } from "vuex"
export default {
    date:function(){
        return {

        }
    },
    computed:{
        ...mapState("second",['node_msg',"node_new"]), //在前面多加一个"second"的名字，能选中store的子store
        ...mapState("three",['node_msg',"node_ace"])  //但是又有一个问题，因为store众多，容易造成参数重名
    },
    methods:{
        ...mapMutations("second",["change"]),
        ...mapMutations("three",["change_ace","change"])
    },

}
</script>
```
* 当store过多造成参数重名怎么办呢，参数名引进来是可以进行更改的，但是不建议这样干，还不如直接找到自己的store进行更改
```
computed:{
        ...mapState("second",['node_msg',"node_new"]),
        ...mapState("three",{
            threeMsg:(state)=>state.node_msg,     //当参数重名的时候可以将后面的数组换成对象然后进行更改
            node_ace:(state)=>state.node_ace      //不过缺点还是很多的，例如后面就算没有参数重名的情况也要变成对象形式
        })
    },
	//注意:mapActions改变的使用是使用dispatch的，因为这个是专门处理异步
	...mapActions("second",["async"]),
	...mapActions("three",{
	        threeAsync:(dispatch)=>{
	            dispatch("async")
	        }
	}),
```

#### 总结Vuex的使用规则
* Vuex的5大核心概念:state,getters,mutations,actions,modules
* 只能通过mutations进行更改state的操作,切记,然后mutations里面的函数有两个参数供修改:
```
mutations:{
	change(state,payload){
		state.xxx = payload     //state是能控制state里面的参数的,payload是接收的参数
	}
}
```
* getters是将state里面的参数修改后备份，相当于data和computed
```
getters:{
	change(state){
		return state.xxx + "我是测试getter的"
	}
}
```
* actions是存放异步操作的，其中参数是store和payload,也是可以传参的
* 注意 注意 注意 actions也是需要通过store.commit()触发mutations改变state里面的参数
```
actions:{
	TestAsync(store,payload){
	      store.commit("Testchange",payload)
	}
}
//值得注意的是他第一个参数是store，用于控制mutations
```
* 最后就是module模块化，将自己的store文件加入总文件中再进行调用就好了

## 符异步组件的重要性，当多个组件同时加载最造成浏览器十分卡顿，异步就能处理这个问题，写法也很简单
* 将引入的路由进行更改
```
import TodoList from "@/components/TodoList"  //这是同步组件
const TodoList = ()=>import"@/components/TodoList" //这个就是异步组件引入
```

## 封装axios方法,使接口更加清晰，容易调接口
* 首先在src文件夹下创建一个utils文件夹，用于存放自己封装的代码，新建一个fetch.js文件输入以下代码:
* 因为可以在请求发起之前预处理一些代码，还有在响应之后，客户端获取数据之前预处理一些代码
```
import axios from 'axios'     //在这个方法里引用这个axios就可以了
import { Message } from 'element-ui' //这个是element.ui的库

// 测试:http://localhost:9090
// 上线:http://baidu.com
var baseURL = 'http://localhost:9090' //这是本地IP地址，用于反向代理的

// 这是axios实例
const fetch = axios.create({
  baseURL: baseURL,
  timeout: 7000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 添加请求拦截器，发生在请求发起之前
fetch.interceptors.request.use(config => {
  console.log('请求拦截，ajax发起请求之前', config)
  var token = localStorage.getItem('token')
  config.headers.Authorization = token   // 用户鉴权,用于鉴定用户发送Token
  return config
})


// 添加响应拦截器，发生客户端接收数据之前
fetch.interceptors.response.use(response => {
  var res = {}
  console.log('响应拦截，ajax接收数据之前', response)
  if (response.data && response.data.code===0) { //设置多重接口拦截
    res = response.data.data || {}
  } else {
    var msg = response.data.message || '请求错误'  //后端会返回一个请求错误时发出的信息
    Message({  //这是Element.iu库的代码	
      message: msg,
      type: 'error',
      duration: 3 * 1000
    })
  }
  return res
}, error => {
  // 调接口失败时，弹个框提示一个用户
  const msg = error.Message !== undefined ? error.Message : ''
  Message({   //这是Element.iu库的代码
    message: '网络错误' + msg,
    type: 'error',
    duration: 3 * 1000
  })
  return Promise.reject(error)
})

export default fetch
```
* 然后在创建一个api.js文件夹用于存放数据接口:
```
import fetch from './fetch'

// 用于获取周杰伦音乐
export function getZjlMusic() {
  var url = '/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=61204160201852987&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=10&w=%E5%91%A8%E6%9D%B0%E4%BC%A6&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'
  return fetch({ url: url, method: 'GET'})
}


//如果需要传参数过去，get请求是多一个params属性，post请求是多一个data属性,不过get属性也可以直接在后面拼接字符串
return fetch({url:url,method:'GET',params:{}})
return fetch({url:url,method:"POST",data:{}})
//传参的话得这样写:
export function getZjlMusic(params) {
  var url = '/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=61204160201852987&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=10&w=%E5%91%A8%E6%9D%B0%E4%BC%A6&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'
  return fetch({ url: url, params:params method: 'GET'})
}
```
* 最后，需要用到哪个接口直接调用就可以了，不需要catch错误指令还有then指令
```
import { getZjlMusic } from '@/utils/api'
actions:{
	getMusic(store) {
	      getZjlMusic().then(res=>{
	        store.commit('changeList',res.song.list)
	      })
	    }
}
//不过注意，要改变state里面的数据还是需要经过mutations  其中changeList就是mutations的方法
//直接使用之后也不需要再在后面加上catch错误之类的，因为在封装的fetch阶段已经截取到了,非常方便
```

## 附引入font awesome库
```
<link href="https://cdn.bootcss.com/font-awesome/5.11.2/css/all.css" rel="stylesheet">
```
* 或者直接百度cdn 选中bootcdn搜索font awesome库
* 符:router-link的exact-active-class非常好用

## 附删除npm安装的模块：
```
npm uninstall xxx  -S  //如果是-D或者-G就写-D或者-G
cnpm uninstall xxx -S //如果是用cnpm安装的就要用cnpm卸载
```

## 附路由引进的三种方法，(含前面没有提到的第三种方法)
* 第一种是直接引用:fetch文件和api文件配置好之后直接在需要的组件中引用api
```
//直接在组件上使用
import { getMsg } from "@/utils/api.js"

methods:{
	getMsg(){}
}
```
* 第二种是先在Vuex的文件中引用api,由actions调用接口,然后组件需要使用再调用actions里面的方法,然后通过mutations修改state的属性
```
//先在Vuex文件中引用
import { getUser } from "@/utils/api.js"

const user = {
	namespaced:true,
	...省略代码
	actions:{
		allgetUser(store,payload){
		            getUser(payload).then(res=>{
		                console.log("res",res)
		                store.commit("changeMsg",res)
		            })
		        }
	}
}
```
```
//然后再在组件中调用
<script>
import { mapActions } from "vuex"
export default {
    ...省略代码
    methods:{
        ...mapActions("user",["allgetUser"]),
        getTest(){
            const data = {
                username: this.username,
                password: this.password
            }
            this.allgetUser(data)
        }
    }
}
</script>
```
* 第三种方式是将接口全部绑在vue的原型上，然后各个组件就可以直接进行调用了
```
//首先，先在api文件中将所有接口一次性抛出
function getZjlMusic(params) {
  var url = '/youzan/getGoodList'
  return fetch({ url: url, params: params, method: 'GET' })
}

function getUser(data) {
  var url = "/youzan/login"
  return fetch({url :url, data:data,method:"POST"})
}

export default {
  getZjlMusic,
  getUser
}
```
```
//然后在main.js的入口文件中将api抛出的文件绑定在Vue的原型上
import http from "./utils/api"  //只需要这两行代码即可
Vue.prototype.$http = http    //这个$http可以更改，只是更语义化

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
```
```
//最后就能在其他组件上以this.$http进行调用啦，而且这个方法不需要经过vuex而且不需要引入任何文件import之类的
methods:{
        getTest(){
            const data = {
                username: this.username,
                password: this.password
            }
            this.$http.getUser(data).then(res=>{  //直接用this.$http调用函数名即可,就能获取接口
                console.log(res)
            })
        }
    }
```

## 附路由守卫的使用，用于拦截路由跳转,分为全局路由守卫和局部路由守卫
* 全局路由守卫是写在router.js总路由文件下
```
//全局路由守卫
router.beforeEach((to,from,next)=>{    
  const Login = localStorage.getItem("role")
  if (to.path == "/Login") {
    next()
  } else {
    if (Login == "1") {
      next()
    } else {
      next("/Login")
    }
  }
})
//这个方法是路由加载之前执行 to指的是将要跳转的路由 from指的是从当前路由 
//其中有一个很重要的参数next 只要当next()执行之后路由才会进行跳转 也可以参数进行修改制定路由跳转 next("/onLoad")
//这个全局路由会进行全局拦截，当你需要跳转任何一个路由都会被拦截下来，除非触发了next()
```
* 局部路由守卫是写在某个组件下的路由，当你需要设置进入哪个组件需要认证之类的操作就可以用到局部路由守卫
```
export default {
  beforeRouteEnter(to,from,next){
    const login = localStorage.getItem("role")
    if (login == '1') {
      next()
    } else {
      next("/Login")
    }
  },
}
//局部路由守卫是以函数形式像生命周期一样直接使用的,to,from,next用法同上
```

## 1、dpr设备像素比

* 设备像素比：DPR(devicePixelRatio)  dpr=1/2/3
* dpr = 屏幕像素 / 设备物理像素
* 屏幕像素是指一台手机1400*2300分辨率的像素,设备物理像素指屏幕多宽
* 所以dpr越大，屏幕越清晰
* 然后同一张图例如100px，因为每台设备的分辨率不一样，占屏幕的大小也不一样，所以才要设置
* 使用`window.devicePixelRatio`可以动态地获取到硬件设备的dpr

## 附移动项目搭建指南：
* 由于屏幕尺寸不一所以需要用rem为单位进行编写代码
* 搭建vue-cli项目和PC端前面步骤一模一样，所以下面的步骤是接着往下
* 在public静态文件夹下粘贴复制一个rem.js的文件,然后在index.html中的header引入
* 由于需要用到rem为单位，所以在Vscode里面加入插件[](https://blog.csdn.net/wjnf012/article/details/92074232)
* 按快捷键ALt+Z就可以将Px转化成rem
* 接下来就开始编写代码了

## 附vue服务端渲染SSR指南,回忆SSR和BSR
* 新建一个文件夹，再用npm init创建一个Page.json文件
* 然后再下载需要的vue模块和vue服务端渲染模块
```
//步骤如下
npm init
cnpm install vue -S
cnpm install vue-server-renderer -S
```
* 然后复制官网的实例代码
```
const Vue = require('vue')
const app = new Vue({
  template: `<div>Hello World</div>`
})

// 第 2 步：创建一个 renderer
const renderer = require('vue-server-renderer').createRenderer()

// 第 3 步：将 Vue 实例渲染为 HTML
renderer.renderToString(app, (err, html) => {   
  if (err) throw err
  console.log(html)
  // => <div data-server-rendered="true">Hello World</div>
})
//本质上就是将vue实例化的template放在renderer进行渲染，变成简单的静态页面
//此时在node环境下也就是cmd上node xxx 运行这个文件即可看到
```
* 然后就是和服务端进行集成，不过要引入node.js的框架Express
* 服务器渲染SSR也有自身的一些缺点，因为渲染上去的是静态的HTML文件，所以
* 首先，上面步骤一致，再加上一步引入Express
```
//步骤同上然后加上一步
npm init
cnpm install vue -S
cnpm install vue-server-renderer -S
cnpm install express -S
```
* 然后在文件里写入以下代码:
```
const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {  //这是路由
    res.setHeader('Content-Type', 'text/html;charset=UTF-8');  //必须加这行代码，不然编译出来的html页面会乱码
    const app = new Vue({
        data: {
            url: req.url,
            quer: "这是测试能不能动态跳转的",
        },
        template: `<div>访问的 URL 是： {{ url }}<h1 v-text="quer" @click="change"></h1></div>
        `,
        methods:{
            change(){
                this.quer = "北京欢迎你" //注意：因为渲染上去是静态文件，所以动态的各种方法全都没用
            }
        }
    })

    renderer.renderToString(app, (err, html) => {
        if (err) {
            res.status(500).end('Internal Server Error')
            return
        }
        res.end(`
        <!DOCTYPE html>
        <html lang="en">
            <head><title>Hello</title></head>
            <body>${html}</body>
        </html>
    `)
    })
})

server.listen(8080)
```

## 附在Vue里面引入echarts组件:三种常用的全局引用方法，熟练之后也可以局部引用
* 首先在当前vue脚手架根目录下安装echarts:
* npm install echarts -S  最好采用npm 
####  第一种方法是将所有需要用到的图标放在一个myEcharts.js文件中，然后绑定在Vue.prototype原型上
* 先在utils文件下新建一个myEcharts.js文件，利用Object.defineProperties ES6语法封装好需要的图标
```
import echarts from 'echarts'
const install = function(Vue) {
    Object.defineProperties(Vue.prototype, {
        $chart: {
            get() {
                return {
                    //画一条简单的线
                    line1: function (id) {
                        this.chart = echarts.init(document.getElementById(id));
                        this.chart.clear();

                        const optionData = {
                            xAxis: {
                                type: 'category',
                                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [{
                                data: [820, 932, 901, 934, 1290, 1330, 1320],
                                type: 'line',
                                smooth: true
                            }]
                        };

                        this.chart.setOption(optionData);
                    },
                }
            }
        }
    })
}

export default {
    install
}
```
* 抛出之后，在main.js入口文件中将文件进行绑定
```
import myCharts from './utils/myCharts.js'
Vue.use(myCharts)
```
* 然后就可以直接在各个组件进行调用了
```
<template>
  <div class="hello">
    <div id="chart1"></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  mounted() {
    this.$chart.line1('chart1');
  }
}
</script>

<style scoped>
  #chart1 {
    width: 300px;
    height: 300px;
  }
</style>
```
* 但是以上的数据都是死的怎么办呢，如果需要动态渲染也可以将api里面的接口函数引入进行调用
* 以下代码是上面代码的基础上加上一个接口调用
```
import echarts from 'echarts'
import { getZjlMusic } from "@/utils/api"  //引入接口文件非常方便

const install = (Vue)=>{

    //下面就是调接口进行使用
    const change = {
        Xdata:[],
        Ydata:[],
    }
    getZjlMusic().then(res=>{
        console.log("res",res)
        res.list.forEach((value)=>{
            change.Xdata.push(value.sale_num)
        })
        console.log("change",change.Xdata)
    })

    //将调接口的数据进行使用
    Object.defineProperties(Vue.prototype, {
        $chart: {
            get() {
                return {
                    //画一条简单的线
                    line1:  (id)=>{
                        this.chart = echarts.init(document.getElementById(id));
                        this.chart.clear();

                        const optionData = {
                            xAxis: {
                                type: 'category',
                                data: change.Xdata  //举例使用这个数据
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [{
                                data: [820, 932, 901, 934, 1290, 1330, 1320],
                                type: 'line',
                                smooth: true
                            }]
                        };

                        this.chart.setOption(optionData);
                    },
                }
            }
        }
    })
}

export default {
    install
}
```
#### 第二种方法是将Echarts放在子组件，然后父组件调用接口或者参数传给子组件进行渲染
* 首先在子组件使用Echarts
```
<template>
  <div class="echart">
      <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
  </div>
</template>

<script>
export default {
    props:{
        Testchart:{   //获取父组件发送过来的数据
            type:Array,
            required:true
        }
    },
  data() {
    return {
      TestchartChild:[], //自己再定义一个数组用于数据筛选
    };
  },
  mounted() {
    this.drawLine(); //需要在mounted中调用
  },
  methods: {
    drawLine() {
        this.Testchart.forEach((val)=>{   //将父组件发送过来的数据进行进一步筛选
            this.TestchartChild.push(val.sale_num)
        })
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "在Vue中使用echarts" },
        tooltip: {},
        xAxis: {
          data: this.TestchartChild  //将数据赋值给图表,从而形成动态图表
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    }
  }
};
</script>
```
* 父级传值的过程,在上面的组件的父组件需要调接口并且传参
```
<template>
  <div class="center_list">
    <EchartTest :Testchart="Testchart"></EchartTest>  //传值过去子组件
  </div>
</template>

<script>

const EchartTest = ()=>import("./Center_list/EchartT")

export default {
  data: function() {
    return {
      activeName: "1",
      Testchart:[] //新建一个data数据用于存储调接口过来的数据
    }
  },
  components: {
    EchartTest
  },
  mounted(){
    this.$http.getZjlMusic().then(res=>{  //在mounted中调接口将数据传入新创建的data里面
        console.log("res",res)
        this.Testchart = res.list
    })
  },
  methods: {
    
  }
};
</script>
```
#### 第三种方法就是将所有调接口的数据放在Vuex中的actions里面进行使用
* 然后图表单独设立一个子组件，例如上面的一样，然后调用Vuex里面的state数据进行渲染，具体就不写了，思路是这样的

