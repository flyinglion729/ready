#### 1、Vue起步

* 渐近式框架：由浅入深、由简单到复杂地使用。
* 优势：代码体积小，基于虚拟DOM，数据双向绑定，生态圈繁荣。
* 可以胜任Web开发、移动端开发、跨平台APP开发。
* 两种安装方式：script标签引入、vue-cli脚手架工程化安装。
* HelloWorld:
	* new Vue()
	* 文本插值 {{ }}
* Vue实例：
	* 响应式体验，动态地改变Vue实例数据：app.msg = "hello 1912"
* Vue指令初体验：
	v-text 插入文本
	v-model 绑定表单的值
	v-on / @  绑定事件
* [在线编码 JSFiddle](https://jsfiddle.net/boilerplate/vue)

#### 2、Vue指令

* 文本类指令
	* 文本用 `{{}}`，用`v-text`优化显示效果
	* 纯HTML，用`v-html`
	* `v-html` ，可以防止XSS,CSRF攻击
	* 表达式，在指令中可以使用js表达式
	* `v-once` 只渲染一次
```
  {{}} 文本插值
  v-text 插入文本
  v-html 插入HTML片段
  v-once 只渲染一次
```

* 动态属性、动态样式
	* 动态样式：`v-bind:class` 和 `v-bind:style`
	* 它们都支持数组语法
	* 它们也支持对象语法
```
  v-bind:title
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
  v-bind:class="[isActive ? activeClass : '', errorClass]"
  v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"
  v-bind:style="[baseStyles, overridingStyles]"
```


* 列表渲染
```
  v-for="(item, index) in arr"
  v-bind:key="index"
```

* 对象渲染
```html
<div v-for="(value, name, index) in obj">
  {{ index }}. {{ name }}: {{ value }}
</div>
```

* 条件渲染  
  * 重点区分v-if 和 v-show的区别
	* 前者条件为false时，元素将从DOM中被移除
	* 后者是用`display:none`来实现显示隐藏的
```
  v-if
  v-else-if
  v-else
  v-show
```


* 事件绑定（事件对象，事件修饰符）
	* 事件处理：`v-on`，简写`@`，灵活使用事件修饰符、键盘修饰符等
	* v-on:click
	* @click.stop
```
<div @click='say("hi", $event)'></div>
```

* 表单绑定（表单修饰符）
	* `.lazy` :失去焦点同步一次
	* `.number` :格式化数字
	* `.trim` : 去除首尾空格
	* `v-model` 等价于 `v-bind:value`+`v-on:input`
```
  v-model.trim=''
  v-model.number=''
  v-model.lazy=''
```

* TodoList项目实践

  * [原型](http://www.todolist.cn/)
  * `v-model` 表单数据绑定
  * `v-on` / `@` 事件绑定
  * `v-for` 列表渲染
  * 列表渲染：`v-for` 与 `:key`的使用
	* 变异方法：push() pop() shift() unshift() splice() sort() reverse()
	* 非变异方法：filter(), concat() 和 slice() ,map()


#### 3、Vue生命周期
```js
beforeCreate: function() {
	console.log('beforeCreate')
},
created: function() {
	console.log('created')
},
beforeMount: function() {
	console.log('beforeMount')
},
mounted: function() {
	console.log('mounted')
	// 在这里调接口、创建swiper组件等操作
},
beforeUpdate: function() {
	console.log('beforeUpdate')
},
updated: function() {
	console.log('updated')
},
beforeDestroy: function() {
	console.log('beforeDestroy')
	// 在这里清除耗费性能的东西，比如定时器等
},
destroyed: function() {
	console.log('destroyed')
}
```
* 各种接口请求等操作， 建议放在`mounted` 这个钩子函数里。
* 需要完整的DOM结构才能做初始化渲染的第三方UI相关的库，它们的业务逻辑都要放在`mounted`这里调用、执行。
* 定时器清除等，可以放在`beforeDestroy`中进行执行。
* 使用 `app.$destroy()` 手动触发组件销毁，组件销毁之后它的各种指令都将失效。
* swiper插件库的使用：`https://www.swiper.com.cn/`


#### 4、响应式原理

```js
var app = {}
// 把普通对象的定义，转化成setter/getter方式进行对象定义
Object.defineProperty(app, 'msg', {
  get: function() {
	return value
  },
  set: function(arg) {
	value = arg
	// 在setter操作里面，通知监听器，更新页面
	watch(value)
  }
})

// 当页面数据发生变化时，更新对象，触发setter操作

document.getElementById('input').addEventListener('keyup', function(e){
  // 触发setter
  app.msg = e.target.value
})

// 监听器
function watch(value) {
  document.getElementById('msg').innerHTML = value
}
```


#### 5、虚拟DOM

* 什么是MVP、MVC、MVVM模式？
	* M  model数据
	* V  view视图
	* C  control控制器
* 如何理解MVVM？
	* VM 即视图模型，你可以理解为虚拟DOM
* 什么是虚拟DOM？
	虚拟DOM就是一个json对象，它用于对真实DOM进行描述。
* 什么是diff运算？
	当Vue实例中的数据发生变化时，Vue会获得一份对虚拟DOM的拷贝，如此我们就有两份虚拟DOM，一份是数据变化前的虚拟DOM，一份是数据变化后的虚拟DOM。所谓的Diff运算，就是对这两份虚拟DOM进行差异比较，从而找出它们的最小差异。再把这份最小的差异渲染到真实DOM中去。
	MVVM框架，基于这种虚拟DOM的Diff运算，大大地减少了DOM的频繁操作，减少DOM操作本身就是一种性能优化。所以MVVM框架有利于性能优化，非常适合数据化的产品应用开发。
	
	
#### 6、自定义组件

什么是Vue自定义组件？
* 组件化的目的：扩展 HTML 元素，封装可重用的代码

如何自定义组件？
* 使用 `Vue.component('my-button', {})` 进行全局组件的注册
* template:`<div></div>`，只能有一个根元素。
* props,实现从父组件向子组件动态传值，在子组件中可以 props进行多重验证，比如`type``required`等。
* data,它必须使用一个工厂函数进行返回，目的为了解决作用域问题
* methods,使用自定义事件，实现子组件向父组件的传值通信（$emit）

自定义表单类的组件：
* 自定义表单组件的封装，原理是`v-model`等价于`:value`和 `@input`。
* 自定义input组件
* 自定义select组件
* 自定义radio组件
* 自定义checkbox组件
* 自定义类表单组件

使用slot插槽自定义组件：
* 使用 slot 插槽，扩展自定义组件
* v-slot指令用在template标签上，指定具名插槽
* 每个插槽都有独立的作用域，可以进行动态传值


#### 7、Vue选项

* Vue实例与选项
	* data 声明式渲染
	* 自定义组件的 props / template
	* methods 方法事件
	* 计算属性`computed`
	* 侦听器`watch`
	* 生命周期与钩子函数

* 计算属性 computed
	* 使用计算属性，替代复杂的模板表达式，让代码更加容易维护
	* 计算属性是基于它们的依赖进行缓存的。
	* 计算属性只有在它的相关依赖发生改变时才会重新求值

* 侦听器 watch
	* 所侦听的data数据，有任何一个发生变化，侦听器都会被触发、执行



--------------------------------------------------

#### 1、dpr设备像素比

* 设备像素比：DPR(devicePixelRatio)  dpr=1/2/3
* dpr = 屏幕像素 / 设备物理像素
* 使用`window.devicePixelRatio`可以动态地获取到硬件设备的dpr


#### 2、关于移动端Web

* [使用WebApp meta标签](https://guide.aotu.io/docs/html/webapp.html)
* 使用rem布局时，一定要指定这个`meta`标签，示例如下：
```html
<meta name="viewport" content="width=device-width,initial-scale=1.0">
```


#### 3、rem移动端布局（root）

* 在`public/index.html`中引入这个`rem.js`文件，把根字体设置成html宽度的十分之一。
```js
function resetRootFZ(){
  var oHtml = document.querySelector('html');
  var w = oHtml.getBoundingClientRect().width;
  oHtml.style.fontSize = w/10 + 'px';
};

resetRootFZ();

window.addEventListener('resize',function(){
  resetRootFZ();
});
```
* 在编辑器中安装px转换rem的插件，并设置其fontSize=75，在写代码时就可以自动地把px单位转化成rem单位。
* [教程：VScode中如何将px转rem](https://blog.csdn.net/wjnf012/article/details/92074232)


#### 4、Touch事件

* Click事件在移动端，会有300毫秒延迟，用于区分移动设备上的单击、双击事件。
* 给网页指定WebApp meta元数据后，可以降低click事件延迟时间。
* Touch事件由`touchstart``touchmove``touchend`组件，仅在移动端Web中被支持，在PC Web中不支持。



--------------------------------------------------

#### 1、服务端渲染

* [Vue.js 服务器端渲染指南](https://ssr.vuejs.org/zh/)
* SSR与BSR的优劣势对比
* SSR有利于搜索引擎优化(SEO)，页面的加载速度会更快(解决首页加载慢的问题)

#### 2、Nuxt.js框架

* [Nuxt.js入门指南](https://zh.nuxtjs.org/guide/installation)
* 使用`create-nuxt-app`脚手架
* [Nuxt项目的配置说明](https://zh.nuxtjs.org/guide/configuration)
* Nuxt路由：Nuxt.js 依据 pages 目录结构自动生成 vue-router 模块的路由配置。
* 声明式路由：<nuxt-link>，支持`active-class`属性。
* Nuxt嵌套路由：创建内嵌子路由，你需要添加一个 Vue 文件，同时添加一个与该文件同名的目录用来存放子视图组件。
* Nuxt动态路由：必须加下划线 (文件夹也可以加下划线(多级嵌套)， 文件也可以加下划线)。
* 编程式路由：`this.$router.push()`等等。
* Nuxt视图：在layout目录下的 default.vue 即根组件的模板了，用<nuxt>指定视图容器。
* Nuxt子视图：<nuxt-child>用于渲染二级的子视图组件。
* 在Nuxt项目中使用axios请求后端数据，使用`asyncData`属性。
```js
// 异步数据请求
  asyncData() {
    return axios.get(url).then(res=>{
      // 这里是无法访问当前组件的this对象
      console.log('this', this)
      console.log('res34', res.data.data.song.list.length)
      // 在这里return 的数据，在页面组件中可以直接使用
      return {
        list: res.data.data.song.list
      }
    })
  }
```
* 在Nuxt项目中使用Vuex，Nuxt项目建议Vuex状态分模块（即多个module）。
```
export const state = () => ({
  list: [1,2,3,4,5]
})

export const mutations = {
  add (state, payload) {
    state.list.push(payload)
  },
  remove (state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle (state, todo) {
    todo.done = !todo.done
  }
}
```

#### 3、项目部署

* 云服务器介绍
* 域名、IP地域、DNS域名解析器、域名备案等
* 如何把本地代码转移至远程服务器上？使用Git，或者使用其它文件上传软件。
* 如何部署前端项目？使用Nginx
* 什么是反向代理？什么是正向代理？

## 技巧篇
#### 如何用VUE写一个多个tab切换问题
* 需要将每一个tab绑定一个点击事件，传入不同参数，然后动态绑定class类名，
* 当某个值等于1的时候展示一个，某个值等于2的时候展示一个即可
```
<div class="tabs">
        <div @click='tabClick("0")' :class='{"on": curTab=="0"}'>tab1</div>
        <div @click='tabClick("1")' :class='{"on": curTab=="1"}'>tab2</div>
        <div @click='tabClick("2")' :class='{"on": curTab=="2"}'>tab3</div>
        <div @click='tabClick("3")' :class='{"on": curTab=="3"}'>tab4</div>
      </div>
      <div>
        <h1 v-show="curTab=='0'">tab1 content</h1>
        <h1 v-show='curTab=="1"'>tab2 content</h1>
        <h1 v-show='curTab=="2"'>tab3 content</h1>
        <h1 v-show='curTab=="3"'>tab4 content</h1>
      </div>
```
* 但是如果使用Element.ui组件的时候，由于标签都是Element自己的标签所以要动用到事件对象event.target来实施
* event.target.parentNode可以取到当前元素的父级元素，从而先遍历一次清除所有
* 然后再重新用event.target获取元素赋值
```
methods: {
      handleClick(tab, event) {
        console.log(tab, event);
        let parent = event.target.parentNode
        for(var i =0;i < 3;i++){
            parent.children[i].style.color="rgba(107,50,141,0.8)"
        }
        event.target.style.color = "orange"
      }
    }
```
#### vue兄弟组件怎么传值
* 首先，兄弟组件之间无法之间传值，需要用到一个共同的载体
* 在assets文件夹里新建一个bus.js文件，实例化一个Vue
```
import Vue from "vue"
export default new Vue
```
* 然后再在components里面新建两个兄弟组件One和Two
```
//在Two组件里，传值过去One组件
<template>
    <div class="two">
        two
        <button @click="get">点击传值</button>
    </div>
</template>

<script>
    import bus from "../assets/bus"
    export default {
        data() {
            return {
                msg:"我是谁"
            }
        },
        methods:{
            get(){
                bus.$emit("change","我在哪")
            }
        }
    }
</script>
```
* 然后在One组件进行接收
```
<template>
    <div class="one">
        one
    </div>
</template>

<script>
    import bus from "../assets/bus"
    export default {
        data() {
            return {
                
            }
        },
        mounted(){
            bus.$on("change",(res)=>{
                console.log(res)
            })
        }
    }
</script>
```
#### 路由的三种形式
* 声明式跳转router-link
```
// two/后面衔接的是参数
<router-link to="/two/123">点击跳转two</router-link>

//然后再在router.js文件中更改/two路由的传参
		{
            path:'/two/:id'
            component:Two
        },
//最后接收参数都是用this.$route.params进行接收
```
* 编程式路由传参，有三种方式
* 第一种是和上述方法一样，但是都会有一个问题，传递的参数能在地址栏显示
```
//创建一个方法进行跳转
<button @click="changeTwo">点击跳转two页面</button>

methods:{
            changeTwo(){
                this.$router.push("/two/123")
            }
        }
//然后在router.js文件中做同样的修改
{
            path:'/two/:id'
            component:Two
        },
//最后也是通过this.$route.params进行接收
```
* 第二种方式是直接通过对象形式进行传参，比较常用，不会将传递过去的参数显示在地址栏
* 而且不需要在router.js文件中做过多的修改，直接在params中可以取到
* 但是需要在router.js文件中增加一个name属性，区分路由
```
//也是创建一个方法进行跳转
<button @click="changeTwo">点击跳转two页面</button>

methods:{
            changeTwo(){
                this.$router.push({name:"two",params:{"id":123}})
            }
        }
//然后再在router.js文件中增加一个name属性
		{
            path:'/two',
            name:"two",
            component:Two
        }
//最后接收也是使用this.$route.params
```
* 第三种也不常用，通过字符串路径传参，会显示在地址栏，是通过query进行传递
```
//也是创建一个事件进行跳转
<button @click="changeTwo">点击跳转two页面</button>

methods:{
            changeTwo(){
                this.$router.push({path:"/two",query:{"id":123}})
            }
        }
//然后优点就是不需要在router.js中进行过多的修改 可以直接在需要的页面
//用this.$route.query获取到
```
## Vue-cli看这一篇文章就够了
[](https://www.jianshu.com/p/72018b6601ce)
## Vue3.0状态搭建
* 首先第一步和Vue一样，安装vue-cli
```
npm install -g @vue/cli
```
* 然后vue -V 会出现vue版本号和vue-cli版本号
```
vue -V
```
* 环境搭好之后，第一步，创建一个项目，注意方法有点不一样
```
winpty vue.cmd create 项目名

<!-- 然后会出现一个选项框 -->
<!-- 选择第二个(用上下箭头) -->
Vue CLI v4.3.1
? Please pick a preset: 
  default (babel, eslint) 
❯ Manually select features
```
* 然后会让你选择这个项目需要搭建的其他插件
* 这里默认选中Router、Vuex等项目必备的，为了等会直接升级vue3.0
```
<!-- 注意：Vue 3.0 项目目前需要从 Vue 2.0 项目升级而来，所以为了直接升级到 Vue 3.0 全家桶，
我们需要在 Vue 项目创建过程中勾选 Router 和 Vuex，所以避免手动写初始化代码 -->

Vue CLI v4.3.1
? Please pick a preset: Manually select features
? Check the features needed for your project: 
 ◉ Babel
 ◯ TypeScript
 ◯ Progressive Web App (PWA) Support
 ◉ Router
 ◉ Vuex
 ◉ CSS Pre-processors
❯◉ Linter / Formatter
 ◯ Unit Testing
 ◯ E2E Testing
```
* 然后进入到项目里面进行项目升级
```
vue add vue-next
```
* 这个命令会自动安装vue-cli-plugin-vue-next插件
* 这个插件会完成以下操作
```
安装 Vue 3.0 依赖
更新 Vue 3.0 webpack loader 配置，使其能够支持 .vue 文件构建（这点非常重要）
创建 Vue 3.0 的模板代码
自动将代码中的 Vue Router 和 Vuex 升级到 4.0 版本，如果未安装则不会升级
自动生成 Vue Router 和 Vuex 模板代码
完成上述操作后，项目正式升级到 Vue 3.0
```
## Vue3.0使用指南
[vue3.0简单介绍](https://composition-api.vuejs.org/zh)
[Vue3.0API详细](https://composition-api.vuejs.org/zh/api.html#setup)
#### 体验Vue3.0的三种方式
```
1.通过官方的Webpack Prewview
2.通过上诉的Vue-cli  然后使用 vue add vue-next
3.通过Vite
```
#### Vue3.0的优化
* 更好的兼容了TypeScript
* 使用了ES6的新特性Proxy,代替了原来的Object.defineProperty，因为前者的性能更加出众，
* 我们在使用Object.defineProperty无法监控到数组的下标的变化，直接导致通过数据下标给数组设置值
* 不能做到及时响应
> 包括以下的数组方法
```
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
```
* 而取代他的Proxy则有以下的优点
```
1.可以劫持整个对象，并返回一个新对象
2.有13种劫持操作
```
* Proxy可以理解成，在目标对象之前架设一层拦截，外界访问到这个对象的时候都必须通过这层拦截
* 因此提供了一种机制，可以对外界的访问进行过滤和改写
* Proxy的基本使用方法
> 其中target表示用Proxy包装的对象(这里可以是任何类型，包括数组 函数 或者Proxy)
> handler是一个对象，里面包含可以劫持的13中操作方法
> 其中包括
```
get: 读取值，
set: 获取值，
has: 判断对象是否拥有该属性，
construct: 构造函数
```
* 我们先简单实例一个Proxy
> 其中target代表当前对象，property代表对象的某个key，value则是赋值的对应值
```
const obj = {}
  const handler = {
    get:(target,property)=>{
      return property in target ? target[property] : 3
    },
    set:(target,property,value)=>{
      target[property] = value
	  <!-- 这里注意要返回一个true代表赋值成功，不然会报错 -->
      return true
    }
  } 
  const p = new Proxy(obj,handler)
  p.name = "这是啥"
  <!-- 这里读取的就是上面的name-->
  console.log(p.name) 
  <!-- 这个返回的是3-->
  console.log(p.age)
```
#### Vue3.0Api setup
* setup()
* setup函数是一个新的组件选项，是Vue3.0Component Api的一个入口点，所有的生命周期和状态属性都在里面
* 但是记得最后要把里面的方法进行抛出
* 另外，setup接收两个参数，第一个参数是props,第二个参数是context,context是上下文，是为了接替之前的方法
* 例如：attrs slots emit
* 另外，this是无法再setup函数里面起作用的,千万注意
* setup暴露出去的值最后也会在this上暴露，所以方法里可以使用this至今获取
```
<script>
import {reactive,ref,onMounted,onUpdated,onUnmounted} from "vue"
export default {
  name: 'App',
  setup(){
    const count = ref(0)
    const state = reactive({
      path:"/"
    })
    onMounted(()=>{
      console.log(window.location.pathname)
    })

    return {
      state,
      count
    }
  }
}
</script>
```
#### reactive
* reactive可以理解成是之前的data，里面可以存放所有的状态，在组件内部可以使用this.xxx获取到
```
<template>
  <div>
    {{state.num}}
    <button @click="changeNum">点击</button>
  </div>
</template>

<script lang="tsx">
  import { provide,ref,reactive } from "vue"
  export default {
    setup(){
      const state = reactive({
        num:23
      })
      return { 
        state
      }
    },
    methods:{
      changeNum(){
        this.state.num ++
      }
    }
  }
</script>
```
#### ref
* ref类似reactHooks里面的useRef，这个在刘雨奚的直播中也有说是有借鉴reacthooks做出了一些更新
* vue3.0里面的ref也是可以当做reative来使用，具有响应式，而且如果ref里的值为对象或者更深层嵌套
* 底部也会调用reative进行响应式
> 有一点需要注意只有在setup()里面需要使用ref.value来获取到ref的值
```
<template>
  <div>
    <button @click="changeNum">点击</button>
	<!-- 展示的时候也是直接使用count即可 -->
    {{count}}
  </div>
</template>

<script lang="tsx">
  import { provide,ref,reactive,onMounted } from "vue"
  export default {
    setup(){
      const count = ref(0)
      onMounted(()=>{
		  <!-- 因为是在setup里面，所以无法使用This，这里需要使用count.value来取值-->
        console.log(count.value)
      })
      return { 
        count
      }
    },
    methods:{
      changeNum(){
		  <!-- 这里获取到的已经是setup抛出的值 所以可以用this直接获取到 -->
        this.count ++
        console.log(this.count)
      }
    }
  }
</script>
```
* ref除了含有reactive的功能之外，还有一个它本身的功能，操控dom
* 当然，在响应式编程里面，用一次dom的消耗是很大的，所以尽量少使用dom
> 注意 当你在模板中使用ref绑定了一个dom之后，原来的value就失效了，你只能获取到dom元素
```
<template>
  <div>
    <div ref="root">
      这就是div
    </div>
  </div>
</template>

<script lang="tsx">
  import { ref,onMounted } from "vue"
  export default {
    setup(){
      const root = ref(null)
      onMounted(()=>{
		  <!-- 这里不再会获得null 只能获取dom-->
        console.log(root.value)
      })
      return { 
        root
      }
    }
  }
</script>
```
#### computed
* computed和vue2.0一样，属于计算属性，本质上是为了解决如果一个state状态值发生改变
* 能够同时计算出从state里面计算出来的值形成一个热反馈
* 可以理解成是一个watch，监听state变化而变化，但是能耗更低
* computed的使用有两种：
> 1.传入一个getter函数，返回一个默认的不可修改的ref对象
```
<!-- 第一种使用方法是传入一个getter函数，里面的返回值就是ref的值 -->
<!-- 所以和ref有相同的取值模式，在setup里面要使用.value 外面则不用 -->
setup(){
      const count = ref(0)
      const plusOne = computed(()=>{
        return count.value + 1
      })
      return {
        count,
        plusOne
      }
    },
```
> 2.传入一个对象，里面包含get()和set()，可以在set()里面进行更改
* 第二种方式使用起来会有点绕，但是理清了顺序还是很容易弄懂的
* 首先 现在count默认值是0，plusOne默认值是1 因为get方法里已经+1了
* 然后我们触发了change方法，将plusOne+1 --> set方法开始触发set里面的val是已经赋值完之后的值为2
* 所以在set里面的count.value = val*2 这时count.value就变成了4
* 然后因为改变了count.value 所以再次触发一次get()所以此时plusOne为5
```
export default {
    setup(){
      const count = ref(0)
      const plusOne = computed({
        get:()=>{
          console.log("count.value",count.value)
          return count.value + 1
        },
		<!-- 注意 这里set里面的val是plusOne赋值之后的值为2 -->
        set:(val)=>{
          console.log(val)
          count.value = val*2
        }
      })
      return {
        count,
        plusOne
      }
    },
    methods:{
      change(){
        this.plusOne ++
        // this.count ++
      }
    }
```
#### readonly
* 在js的语言中，只有简单数据类型可以设置只读类型，就是使用const，但是如果换成复杂数据类型
* 例如是对象或者是数组，就无法设置只读的类型了，里面的值是可以随意更改的
* 所以vue3.0引入了readonly属性，可以对复杂数据类型进行设置只读，不单单是简单的对象还可以是状态对象或者是ref
> 注意 只有被赋值之后的readonly对象会有只读属性，但是不会改变赋值对象本身的可修改属性
```
import { ref,readonly,  reactive } from "vue"
  export default {
    setup(){
      const state = reactive({
        count:20
      })
      const only = readonly(state)
      return {
        state,
        only
      }
    },
    methods:{
      change(){
		<!-- 原来的state还是可以修改的-->
        this.state.count ++
		<!-- 如果修改readonly对象则会报错 -->
        this.only.count ++
      }
    }
  }
```
#### watchEffect
* watchEffect可以理解成是vue的watch，但是不需要单独声明是哪个变量需要监听，只要是里面的状态值发生改变就会执行里面的方法
* 在实际运用中，还没想到什么好的用法，在官方实例中也是简单的使用了以上功能
* 其中还有一个能够停止监听的方法，这个应该是和watch区分开的区别之一
* 实际还有种用法官方实例会更清晰一点
[](https://composition-api.vuejs.org/zh/api.html#watcheffect)
```
 setup(){
      const state = reactive({
        count:20
      })
      const stop = watchEffect(()=>{
        console.log("监听了",state.count)
      })
	  <!-- 如果执行了这个stop，则不会再继续监听-->
      stop()
      return {
        state
      }
    },
```
#### watch
* 相比于watchEffect，watch在我理解里会更强大一点，首先watch的使用方式和vue2.0其实是一样的
* 另外watch还允许我们:
```
1.懒执行副作用
2.更加明确哪些状态改变会触发监听器重新加载
3.可以访问状态更新前后的值
4.可以监听多个状态
```
* 监听多个状态的时候可以使用数组的形式
```
setup(){
      const getRef = ref(0)
      const state = reactive({
        count:20,
        num:0
      })
      
      watch(()=>state.count,(count, prevCount)=>{
        console.log("监听到了恭喜你")
      })
      watch(getRef,(getRef,prevGetRef)=>{
        console.log("能监听单个ref")
      })
      watch([state.count,state.num],([count,num],[prevCount,prevNum])=>{
        console.log("监听到了恭喜你22")
      })
      stop()
      return {
        state,
        getRef
      }
    },
```
#### getCurrentInstance
* vue3.0还有一个隐藏的api,就是getCurrentInstance() 这个api能帮助我们在setup里面取得上下文
* 就是说能够在setup充当this的作用
```
import {getCurrentInstance} from "vue"
export default {
	setup(){
		const { ctx } = getCurrentInstance()
		console.log("ctx.$emit",ctx.$emit)
	}
}
```
#### setup的生命周期钩子函数
* 在setup中也可以使用类似vue2.x的生命周期函数，因为组件实例上下文也是在生命周期钩子同步执行期间设置的
* 所以在组件卸载的时候，在生命周期钩子内部同步创建的监听器和计算状态也将自动删除
* 以下举例三个常用钩子
```
import { onMounted, onUpdated, onUnmounted } from 'vue'

const MyComponent = {
  setup() {
    onMounted(() => {
      console.log('mounted!')
    })
    onUpdated(() => {
      console.log('updated!')
    })
    onUnmounted(() => {
      console.log('unmounted!')
    })
  },
}
```
* 其余钩子对应vue2.x如下
```
beforeCreate -> 使用 setup()
created -> 使用 setup()
beforeMount -> onBeforeMount
mounted -> onMounted
beforeUpdate -> onBeforeUpdate
updated -> onUpdated
beforeDestroy -> onBeforeUnmount
destroyed -> onUnmounted
errorCaptured -> onErrorCaptured
```
#### 最后对于使用reactive还是ref的想法
* 这里面其实更加推荐全部使用reactive，在组合函数返回响应式对象时使用 toRefs即可
* 因为如果ref里面存储的是复杂数据类型，其实还是会在内部调用reactive的，其中官方文档也是这样描述的
[](https://composition-api.vuejs.org/zh/#ref-vs-reactive)
#### 代替Vuex provide 和 inject实现状态传递
* 理论上来说vue3.0是不再需要vuex了，可以通过provide和inject作为状态注入实现这个状态的传递
* 注意 provide和inject都需要在当前活动组件的setup中进行调用
* 这个的原理也是vue2里面的提供者，和注入，就是在所有组件的父组件调用provide进行注入，然后下面
* 所有的子组件都能获取到这个值，加入ref之后还能动态获取到，而且进行操作
```
<!-- 先在所有组件的父组件中进行提供provide -->
<!-- 或者直接在app.vue里面使用，这样效果会更好，下面的所有路由都会享受到这个方法-->
  import { provide,ref } from "vue"
  import { useMousePosition,useProject } from "../../components/Title"
  import Project from "../Project/Project.vue"
  import Reject from "../Reject/Reject.vue"
  export default {
    setup(){
		<!-- 下面两行代码即是将xxx注入，初始值为0 -->
		<!-- 其中下面的子组件 -->
      const getNum = ref(0)
      provide("xxx",getNum)
      return {  }
    },
    components:{
      Project,
      Reject
    }
  }
```
> 其中注入代码可以封装成一个复用的方法，减少代码量
> 然后直接调用即可
```
export const useProject = (key,value)=>{
  const store = ref(value)
  return provide(key,store)
}
```
* 最后就可以实现在子组件中的获取和使用，这都是及时更新的
```
<!-- 在第一个子组件中展示xxx值 -->
import { provide ,inject} from "vue"
  export default {
    setup(){
		<!-- 获取到的num可以直接抛出，在模板中也是直接使用{{num}}即可展示 -->
      const num = inject("xxx")
      return {
        num
      }
    }
    
  }

<!-- 然后在第二个子组件中修改xxx值，第一个子组件也会发生变化 -->
import { inject ,reactive} from "vue"
  export default {
    setup(){
      const num = inject("xxx")
      return {
		  <!-- 记得最后要抛出-->
        num
      }
    },
    methods:{
      changeNum(){
		  <!-- 获取xxx也很简单，注入的同时就会暴露在this上面-->
        this.num ++
      }
    }
  }
```
#### Vue3.0实现自定义方法
* Vue3.0还有一个很强大的地方，就是能够像react Hooks一样将可以复用的工具文件提取出来类似useDidMount
```
<!-- 以下是在.js文件中使用的 -->
import { ref, onMounted, onUnmounted } from 'vue'

export function useMousePosition() {
  const x = ref(0)
  const y = ref(0)

  function update(e) {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return { x, y }
}
```
* 然后就能在组件中使用
```
<script>
  import { useMousePosition } from "../../components/Title"
  export default {
    setup(){
      const { x, y } = useMousePosition()
		...其他代码
      return { x, y }
    }
  }
</script>
```
## 前端开发利器，Vite
[vite仓库](https://github.com/vitejs/vite)
[搭建vite+vue3.0指南](https://www.jianshu.com/p/0ebd56cb22d2)
* 这个开发利器只能在开发环境中使用，他的逻辑是直接将代码上传到浏览器端进行解析，然后服务器再打包给浏览器，
* 就不会像webpack那样打包好了之后再发给浏览器编译，节约了很多时间
* 因为现代浏览器其实是支持import 的 所以你把代码直接上传到浏览器解析的时候浏览器可以直接通过import 找到你的依赖项进行解析
#### 使用vite+vue3.0搭建你的项目
```
<!-- 先安装一下脚手架 -->
1.cnpm install create-vite-app -g  

<!-- 第二步新建一个自己的项目 -->
2.	npm init vite-app <project-name>
或者	npm create-vite-app vite

<!-- 然后启动项目即可 -->
3、npm install
4、npm run dev
```
* 这个时候已经可以用Vite使用vue3.0的语法了
* 然后安装vue-router
```
<!-- 首先查看vue-router的所有版本号 -->
npm info vue-router versions

<!-- 然后安装vue-router@4.0.0-beta.6 -->
cnpm install vue-router@4.0.0-beta.6 -S
```
* 接下来就是配置vue-router了
* 简单来说Vue Router的vue3.0版本主要区别就是我们进入路由的方式变了，其中最重要的就是createRouter和createWebHistory
* 在之前如果要切换路由模式直接在mode:history就能从哈希模式更改为history模式了，现在更替为history:createWebHistory来实现
* 这一切都是为了适配typeScript做的修改
```
<!-- 在根目录下src新建一个router文件夹，然后在router文件夹下新建一个index.js -->
<!-- createWebHistory对应就是histroy模式  createWebHashHistory就是hash模式 -->
import { createRouter, createWebHistory ,createWebHashHistory} from 'vue-router'
import Home from "../view/Home/Home.vue"

const routerHistory = createWebHistory()

const router = createRouter({
  history:routerHistory,
  routes:[
    {
      path:"/",
      component:Home
    }
  ]
})

export default router
```
* 最后在main.js进行引入，大体和vue2.0一样，只是为了更加适配typescript
```
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from "./router"

const app = createApp(App)

app.use(router)
app.mount('#app')
```
* 最后在主页面引入<router-view>就能使用vue-router了
#### 引入sass
* 首先先安装sass
```
cnpm install sass --save
```
* 然后这时候会发现控制台报错，只需要把package.json中的sass移动到devDependencies栏
* 然后重新npm run dev启动项目即可
```
{
  "name": "myweb",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "vue": "^3.0.0-rc.1",
    "vue-router": "^4.0.0-beta.6"
-	"sass": "^1.26.10",
  },
  "devDependencies": {
+   "sass": "^1.26.10",
    "vite": "^1.0.0-rc.1",
    "@vue/compiler-sfc": "^3.0.0-rc.1"
  }
}
```
#### 引入TS
* 其实Vite脚手架中是自带TS的，所以不需要重新安装，但是有些编辑器可能会报错，报错的时候重新执行以下命令安装一下即可
```
yarn add typescript -D
tsc --init
```
* 如果使用VsCode就跳过上面那一步，我们直接把main.js改为main.ts
* 但是你会发现控制台还是会报错，原因是因为ts编辑器无法理解.Vue文件
* 所以我们在src目录下加入一个ts解析文件xxx.d.ts告诉Vite怎么理解.Vue文件即可
> 这里我使用的是shims-vue为文件名 在 src/shime-vue.d.ts中输入以下命令
```
declare module '*.vue' {
  import { Component } from 'vue'
  const component: Component
  export default component
}
```
* 这时候你发现控制台还是会报错找不到main.js文件，因为在Index.html文件中引入的main.js要改成main.ts
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vite App</title>
</head>
<body>
  <div id="app"></div>
  <!-- 这里改成main.ts-->
+  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```
* 然后就能正常使用typescript了
> 注意 如果要在.Vue单文件中使用ts 要把script标签改为
> <script lang="ts">
#### 如果需要用Vite搭建react脚手架也可以
[vite脚手架git地址](https://www.npmjs.com/package/create-vite-app)