## node.js就是使用js编写后端程序
* node.js把JS只能操控浏览器的语言改变成能够直接和服务端进行交流的语言，让前端被重视起来
* node.js是一个能在服务器端使用Js的开放源代码、跨平台的javascript运行环境
* node采用Google开发的V8引擎运行JS代码，使用事件驱动、非阻塞和异步I/O模型等技术来提高性能，可优化应用程序的传输量和规模
* I/O模型指的是通过服务器向数据库进行写入input和读取output
#### node前期准备工作
* 首先需要下载node,百度Node进入官网即可下载
* 然后如果是使用Vscode 可以使用node Snippets插件，在书写代码的时候就会有代码提示了
#### node.js的优势
```
web端是通过客户端的请求 -- 然后到服务器 ---服务器再通过I/O读写数据库 ---然后服务器拿到数据库里的数据再响应给客户端
这个过程中，当时的主流语言java等都是一个请求进来，就新建一个线程，但是如果这个线程还在读写数据库就不能断
那其他的线程就得一起等着，这就是阻塞I/O
这个过程影响速度最多的就是I/O读写数据库这个阶段，所以node.js搭配v8引擎横空出世
node.js处理办法就是，所有的请求都只创建一个线程，这就避免了I/O阻塞，加快了读取速度
```
#### node.js的用途
* node.js可以说是成也单线程，败也单线程，node.js只适合处理访问量不大的网站，不然单线程兜不住
* 大型的网站还是需要Java这种多线程语言来支持
* 但是这个问题可以用分布式来解决，就是多开几个服务器，因为Node对服务器的要求并不高，一台1000块钱的服务器能达到1万块钱的效果
```
Web服务的API 就是类似接口
实时的多人游戏
多客户端的即时通讯
```
#### windows电脑的CMD窗口指令
```
--常用指令
1.dir  						列出当前目录下的所有文件
2.cd   						目录名 进入指定目录
	//如果想去到别的盘可以使用e:或者f:
3.md   						在当前目录下创建一个文件夹
4.rd + 文件夹名字   			删除当前文件夹
5.文件名称(hello.txt)   		打开当前文件
--目录列表
1.  ./当前目录
2.  ../上一级目录  可以这样用cd ../  回到上一页
```
* 当使用命令行打开文件的时候，必须要进入当前目录才能打开，但是有时候有些文件经常被使用，就不可能每次都打开那个文件所在的目录
* 这样会很繁琐，所以引入了一个环境变量，这个环境变量可以理解成是windows系统里面的变量
* 在我的电脑右键属性栏高级系统设置-高级里面有环境变量的选择
* 环境变量也分两种：1.用户变量 2.系统变量
* 1.用户变量是当前用户才能使用(这是常用的，因为使用系统变量有时候可能会出错) 2.系统变量则是所有用户都能使用
```
环境变量就是windows系统里面的变量
环境变量里面有个很重要的Path变量，负责将常用文件的路径进行保存，可以用命令行直接访问到
在新增的时候注意要用分号进行隔开才能新增
只要是在Path里面的路径目录下的所有文件，都能用命令行直接打开，不管命令行当前是处在哪一个目录下都可以
原理:
	当你在命令行使用某个文件的时候，windows默认先从本目录下进行查找，当找不到那个文件之后，会依次在Path的路径下进行寻找
```
#### 进程和线程
* 进程可以在每台电脑的任务管理器中进行查看
* 进程是负责为程序的运行提供必备的环境，就相当于一个工厂
* 在任务管理器中看到的所有进程，都不一定是在运行程序，只有那些占用了CPU的才是有程序在运行
* 而线程则表示在工厂里干活的工人，是真正要使用的程序，在进程提供的特定环境下进行使用，是占用CPU的
* 单线程和多线程，首先多线程不一定效率会比单线程高，但是一般会比单线程高而已，其中js就是单线程的语言，Java是多线程的
```
1.进程
	进程相当于一个工厂，为线程提供程序使用的环境
2.线程
	线程代表计算机的最小计量单位，线程是负责进程中的程序，相当于工厂里的工人
```
## node语法
* node的执行类似java,在命令行进入当前目录，然后使用node 文件名即可执行文件
#### node模块化
* 在node里面，每个Js文件的JS代码都是独立于文件之中的，换句话说就是每个Js文件虽然是全局作用域，但是也相当于是一个大的自运行的方法
* 在这个方法里面使用变量需要暴露出去才能被别的模块使用到
* ES5模块化引入
```
require("./nodefirst") //即可引入同目录下的文件 ,但是单单这样是无法访问当文件中的变量的，只能启动该文件中的自启动的代码
```
* 如果想要一个文件中的一个变量抛出，另一个模块接收可以使用exports和require
* require进来的模块本质上就是一个对象，里面包含的就是引入文件中导出的部分
```
//抛出的模块one.js
exports.x = "这是啥"

//接收的模块two.js
let md = require("./one")
console.log("打印出来看看",md)
```
* node的模块分两种，和JS一样
* 1.核心模块，直接使用require引入模块名即可，也叫引入模块标识
* 2.文件模块，由用户自己创建的模块，向上面这种引入方式引入，需要加上路径
```
let fs = require("fs") //引入核心模块，直接填写模块名即可
let math = require("./math") //引入具体的文件模块，需要加上文件路径
```
* 其实本质上，每次npm install 安装的模块都会放在node_modules里面
* 然后我们引入的时候直接使用let xx = require("yy") 进行引入即可
* 这个过程其实就是引用的node_modules中的"yy"这个包的包内那个index.js这个文件
#### node在全局上声明的是局部变量
* 在Node里面有一个类似window的全局变量叫做global，因为Node是后台语言所以没有window
* 但是如果在全局里var 声明一个变量，该变量是一个局部变量，没办法使用global访问到，除非直接声明a = 1
```
var a = 1
b = 1
console.log("global",global.a)   // undefined   如果使用声明就会变成局部变量
console.log("global2",global.b)  // 1      不使用声明就会暴露在全局变量
```
* 这是因为在node执行模块中的代码时，它首先会在最外层套一层如下函数，所以就算你在全局里声明一个变量，那个变量也是局部变量
* 所以实际上node在指向的时候是将代码放在一个方法里面执行，并且在执行方法之前向里面传入了5个实参
* 怎么验证你在全局变量里其实是在一个方法里面呢，可以使用arguments.callee 这个方法是指向一个方法中的自己
```
console.log(arguments.callee)
//为了看清这个方法的真实情况 可以把这个方法变成字符串打印出来
console.log(arguments.callee + "")  //这个时候就显示出最外面那层方法的样子了

function (exports ,require,module,__filename,dirname) {
	...具体代码
}
```
* 其中，模块方法传入的这五个实参的用法如下
```
exports  		-- 用于将模块中的变量或者方法暴露出去
require  		-- 用于引入外部模块
module   		-- 代表当前模块本身，就是方法的本身，其中exports就是module的属性
				-- 换句话说就是既可以使用exports导出，也可以使用module.exports导出
				-- 但是不能将module理解成js的window，还是获取不到当前方法里的变量的
__filename 		-- 当前模块或者说是文件的完整路径 "c:\user\....."
__dirname		-- 当前模块的文件夹完整路径 就是__filename这个文件的文件夹路径，上一级路径
```
* 其中module.exports和exports还是有相当的区别的
* 可以看做exports 是指向 module.exports 并不是exports本身有抛出的能力 所以当要抛出多个的时候优先选择module.exports
```
exports.xxx = "xxx" //只能单个单个的修改
export = {
	name:"asd"  //这样是会报错的，因为exports本身是无法抛出的，只是这个值是指向module.exports所以能够单个更改，但是多个更改就与
}				//module.exports无关了
//综上所述，如果需要抛出变量，优先直接选用module.exports
module.exports = {
	name:"孙悟空",
	age:12,
	getName:function(){ 
		console.log("孙悟空")
	}
}
//上面module.exports是可行的，所以优选module.exports
```
#### 包管理和包结构
* 包实际上就是一个解压之后的文件目录，目录之下应该包含如下文件
```
package.json   		---描述文件  (这个很重要，是用来描述这个包是干嘛的，也是必须要的)
//以下文件可有可无，
bin   				---可执行的二进制文件
lib 				---js代码
doc					---文档
test				---单元测试
```
* 其中package.json里面的需要使用的key值
```
"dependencies":{}  //这一栏是需要的依赖，类似前端的Npm依赖
"description":""  //这一栏是描述，描述该包的作用
"devDependencies":{}  //这一栏是开发依赖，在正式上线的时候是不需要的
"homepage":     //这个是主页的地址
"main":"./xxx"   //这个是主文件，也是入口文件
"maintainers" :    //表示这个包的贡献者，是可以多人的
"name":     //这个是包的名字，当下载下来之后直接用require引入就是这个名字
```
* npm仓库也可以下载node的包，也是node的包管理网站
* 在安装包的时候，和前端一样，也要先使用npm init创建出一个package.json文件才能把包使用npm install下载到当前文件夹中
* 不然会下载到其他目录下
```
npm init
npm install xxx    //即可下载所有的包 都会放在node_modules

npm remove xxx     //删除某个包
```
* npm寻找包依赖有一个规则
```
node在使用模块名字引入包的时候，会首先在当前目录下的node_modules寻找当前的包
如果一直找不到的话就会找上一级的node_modules，如果一直上级上级目录也找不到
最后会找到磁盘的根目录下，如果磁盘根目录也没有，则报错

let math = require("math") //如果当前目录没有这个包，则会一直往上一级寻找，类似作用域
```
#### 包管理CommonJs规范
* 如果对出包感兴趣的同学可以使用CommonJs这个规范进行使用
```
package.json:包描述文件
bin:用于存放二进制文件的目录
lib:用于存放JavaScirpt代码的目录
doc:用于存放文档的目录
```
#### Buffer缓冲区
* 用户在请求数据的时候发送的都是二进制数据，所以后台必须要有一个值来缓冲一下二进制数据
* 所以Buffer的作用在于，接收用户数据的使用作为一个缓冲区，而且响应数据的时候也作为一个缓冲区
* Buffer缓冲区也可以是为了数组中存储的不足设置的，Buffer里面存储的都是二进制文件，所以可以存储类似MP4还有音乐和图片
* 另外有一点要提醒的是，所有的二进制数据在计算机里面都会以16进制表示出来，因为二进制太长了，太占内存
* 换句话说就是Buffer里面存储的都是二进制数据，但是显示就是16进制的
* 使用Buffer也不需要引入模块，直接使用即可
```
let str = "我是谁，我在哪，我在干嘛"
let buf = Buffer.from(str)
console.log(buf)  //打印出二进制buffer文件

str.length  //字符串长度
buf.length  //Buffer中的长度是占用内存的大小，也表示多少个字节
Buffer.from()  //将字符串转化成二进制的Buffer存进去
//如果要把Buffer转换回来用toString即可
```
* Buffer中每个元素的范围都是00 - ff 就是是00 - 255
* 因为Buffer本身就是存储二进制的文件，16进制表示二进制 ff表示的是11111111 刚好是二进制中这个数最大的值
* 所以也可以理解成，Buffer最大的范围是 00000000 - 11111111
* 也表示一个字节，一个字节表示8位二进制，传输数据的最小单位也是字节
* 其中一个中文占3个字节，一个英文占一个字节
```
8bit = 1bytb (字节)
1024bytb = 1kb
1024kb = 1mb
1024mb = 1gb
1024gb = 1tb
```
* 创建一个固定长度的Buffer : Buffer.alloc和Buffer.allocUnsafe
* Buffer的大小一旦固定，就不能改变，因为Buffer本质上是直接操控底层的内存，在底层的内存中占用一块连续的长度内存
* 而且一旦存入超出最大值11111111的数会自动的保留后面8位，所以就不是原来的那个数
```
//创建一个10字节长度的Buffer
let buf = Buffer.alloc(10)  //新建一个10个字节内存长度的Buffer
//可以像数组一样，通过索引来控制Buffer
buf[0] = 12
buf[2] = 22
buf[3] = 556   //已经超出了255 所以不会展示出556这个数，会保留二进制中的后8位
console.log(buf)

//除了Buffer.alloc可以创建一个固定长度的Buffer 还可以使用Buffer.allocUnsafe
// Buffer.allocUnsafe创建一个指定大小的Buffer的同时，不会去清空这个内存之前的数据，所以可能会含有敏感数据，是之前保留下来的
// 换句话说 Buffer.alloc这个方法在创建一个指定大小的Buffer的同时，会去清空之前的数据，所以性能会没allocUnsafe好
let buf2 = Buffer.allocUnsafe(10)
console.log(buf2)

//如果需要读取buffer就像数组一样直接读取当前的索引即可
console.log(buf[2])  //而且读取出来的数也是十进制的数
//但是如果一定想要控制台打印出16进制的数 也不是不可以，可以转化成str即可
console.log(buf[2].toString(16))
```
* 另外，Buffer和数组有很多相似的地方，也可以用来遍历和使用数组的一些方法 类似map之类的
* 所以可以把Buffer当成数组去用即可
```
for(var i=0;i<buf.length;i++){
    console.log(buf[i])
}
buf.map((item,index)=>{
    console.log(item)
})
```
#### fs模块，文件系统
* node通过fs模块对文件系统的交互，包括打开，存储和写入等操作
* 注意 fs模块中的所有操作都有两种形式可供选择，就是同步和异步
* 同步文件会阻塞系统程序的运行，异步文件不会阻塞系统的运行，而是操作完毕之后通过回调函数将其结果返回
```
<!-- 打开文件 fs.open(path,flags)  path为当前文件地址，flags为打开文件后的操作r表示只读，w表示可写 -->
<!-- 注意，如果使用fs.openSync("test.txt","w")当前没有这个文件，会创建出一个这个名字的文件 -->
let  fs =  require("fs")
fs.open()  			//异步打开文件
fs.openSync()		//同步打开文件

fs.write()          //异步写入文件
fs.writeSync()      //同步写入文件

fs.close()			//异步关闭文件
fs.closeSync()      //同步关闭文件
```
* 同步的操作更好理解
```
let fs = require("fs")
let fileNum = fs.openSync("test.txt","w")  //首先打开这个文件，如果没有这个文件会自动创建一个，并获取文件的独立编码
fs.writeSync(fileNum,"今天的天气真不错",20,"utf-8") //然后通过这个独立的编码写入文件，第三个参数是开始输入的地方空出多少格数据
													//最后一个参数是表示字符编码，默认是utf-8 一般不用改
fs.closeSync(fileNum)					   //最后一定要关闭文件，不然容易占内存
```
* 异步文件写入，这也是Node的异步优势
* 异步文件写入可以理解成是同步文件写入的同时加入了一个callback回调函数，而且异步文件是没有返回值的，不会返回fd编码
* 但是会在回调函数里的第二个或者后面几个参数里面返回fd编码，然后在回调函数里面使用即可，异步操作会比同步操作更加高效
```
let fs = require("fs")
fs.open("test.txt","w",(err,fd)=>{                         				<!-- 首先异步打开文件 -->
    if (err) return console.log("打开文件失败",err)
    fs.write(fd,"这是异步写入的文件",(err)=>{							<!-- 然后异步写入文件 -->
        if (err) return console.log("写入文件失败",err)
        console.log("写入成功")
        fs.close(fd,(err)=>{											<!-- 最后异步关闭文件 -->
            if (err) return console.log("关闭文件失败",err)
            console.log("关闭文件成功")
        })
    })
})
```
* node内部也封装了很多方法供我们使用，例如简单的文件写入就是其中之一
* 简单的文件写入是fs.writeFile(path,data,options?,callback)
* 其中可选项options是一个对象{},一般省略不写
```
let fs = require("fs")
fs.writeFile("test","这是writeFile写入的内容",()=>{
  console.log("写入成功")
})
```
* 其中打开状态是可调节的，例如上面的fs.writeFile默认是"w",这个写入是每次都从头开始覆盖写入
* 其他的打开状态可调节到自己想要的模式
* 可以在options里面的flag:里面自行选择
```
<!-- 打开状态 -->
r			---读取文件，文件不存在则出现异常
r+			---读写文件，文件不存在则出现异常
rs			---在同步模式下打开文件用于读取
rs+			---在同步模式下打开文件用于读写
w			---打开文件用于写操作，如果文件不存在则创建，如果存在则截断
wx			---打开文件用于写操作，如果存在则打开失败
w+			---打开文件用于读写，如果不存在则创建，如果存在则截断
wx+			---打开文件用于读写，如果存在则打开失败
a 			---打开文件用于追加，如果不存在则创建
ax			---打开文件用于追加，如果路径存在则失败
a+			---打开文件进行读取和追加，如果不存在则创建该文件
ax+			---打开文件进行读取和追加，如果不存在则报错
```
* 如果想要写入其他地方的文件，可以直接更改path里面的配置，里面是支持绝对路径的，但是x\要注意用\\两个转义一下
* 或者直接使用linxc里面的/这种斜杠也行
```
let fs = require("fs")
fs.writeFile("G:\\Node学习\\test.txt","这是writessFile写入的内容",{flag:"a"},()=>{
  console.log("写入成功")
})

<!-- 路径的第二种写法 -->
G:/Node学习/test.txt"
```
#### 流式文件写入
* 无论是同步简单文件写入和异步简单文件写入，一单涉及大文件写入就不合适，因为一次性导入文件太大了，性能太差，容易导致内存溢出
* 所以出现了流式文件写入，简单理解就是，创建一个文件流，然后持续不断的慢慢写入，不影响其他操作，
* 使用的方法是fs.createReadStream(path[, options]),写入只读流，fs.createWriteStream(path[, options]),写入可读流
* 详情可看[](http://nodejs.cn/api/fs.html#fs_fs_createreadstream_path_options)
* 这里备注一个知识点，on("事件字符串",回调函数)用于绑定事件，once("事件字符串",回调函数)用于绑定只触发一次的事件，触发之后立即销毁，
* 有比较好的性能
```
let fs = require("fs")
let ws = fs.createWriteStream("创建一下.txt")  //创建一个文件流
ws.write("写入了什么")							//写入文件的同时打开流式文件水管
ws.write("这就是第一个")
ws.write("这是第二个")

ws.close()     //最后要记得关闭水管

ws.once("open",()=>{  				//因为流式文件水管打开只是打开一次，所以用Once绑定即可，open是一个监听文件流打开的事件
  console.log("流式文件打开了")  
})
ws.once("close",()=>{				//close是监听文件流关闭的事件
  console.log("流式文件关闭了")
})
```
#### 文件的读取
* 文件读取也和前面的文件写入一一对应，分为：1.同步文件读取，2.异步文件读取，3.简单文件读取，4.流式文件读取 这几样
* 同步文件读取也是先open文件，然后读取fs.read()...之类的，所以直接从简单文件读取开始看
* 简单文件读取的API是:1.fs.readFile(path[, options], callback)和同步的2.fs.readFileSync(path[, options])
* 注意：读取的文件都会转化成Buffer文件类型，因为这种类型的数据可以是任何格式的文件，非常方便，读取的同时还能把Buffer文件
* 写入到其他地方，完成一个简单的复制过程
```
let fs = require("fs")
let path = "C:\\Users\\MICHEL\\Desktop\\其他\\微信图片_20200722000641.jpg"
fs.readFile(path,(err , data)=>{   												//callback有两个参数，一个是错误，当发生错误的时候
  if (err) return																//就会存在，第二个就是data,是一个Buffer文件
  console.log("文件是啥",data)
  fs.writeFile("图片.jpg",data,()=>{  											//获取到文件之后进行写入即可
    console.log("复制成功")
  })
})
```
#### 流式文件的读取
* 相比流式文件的写入，流式文件的读取显得更有必要，因为大文件的读取如果按简单文件读取，会非常阻塞主流程加载其他东西
* 流式文件的读取也是一样，先创建一个管道，然后一点点的开始读取，不会阻塞主流程的进程
* 采用的api是fs.createReadStream(path[, options])
* 注意注意注意： 读取流有一个事件，data，只有当读取流绑定了这个事件之后才会触发读取完毕的close事件
* 还有data这个事件比较特殊，不像写入流那样，data会自动关闭，并且每次读取的小块文件可以在回调函数里的data里面看到
```
let fs = require("fs")
let path = "G:/2345下载/360aqllq_9.1.0.362.exe"  
let rw = fs.createReadStream(path)				//首先创建一个读取流

rw.once("open",()=>{							//和写入流一样，这也有一个监听读取开始和读取结束的事件
  console.log("开始流式读取")
})
rw.once("close",()=>{							//这个关闭事件必须当rw绑定了一个data事件之后才会触发，当文件完全读取完之后触发
  console.log("关闭流式读取")
})

rw.on("data",(data)=>{							//  注意 注意 如果没有这个data事件，是不会触发读取流关闭的
  console.log("看看读取的文件",data)
})
```
* 这时，就可以用流式文件读取和写入做一个大文件的复制功能
* 注意注意注意 写入的时候要知道那个文件的尾缀例如栗子中的360测试.exe格式为exe
```
let fs = require("fs")
let path = "G:/2345下载/360aqllq_9.1.0.362.exe"
let rw = fs.createReadStream(path)
let wf = fs.createWriteStream("360测试.exe")     	//先创建一个写入流

rw.once("open",()=>{
  console.log("开始流式读取")
})
rw.once("close",()=>{
  wf.close()
  console.log("关闭流式读取")
})

rw.on("data",(data)=>{
  wf.write(data)
  console.log("看看读取的文件",data)
})
```
* 这种流式读取和写入非常常见，但是上诉方法太过繁琐，所以node有一个api联通了这个两个api为一个API
* 就是管道rw.pipe(wf)   读取流.pipe(写入流) 这样一个管道的形式进行
* 上面的代码可简略成一下代码
```
let fs = require("fs")
let path = "G:/2345下载/360aqllq_9.1.0.362.exe"
let rw = fs.createReadStream(path)
let wf = fs.createWriteStream("360测试.exe")

rw.pipe(wf)  //可读流.pipe(可写流)  
```
#### fs文件模块的其他小知识
* fs.existsSync(path)  检查某个文件是否存在某个路径下
* 注意，这个方法只有同步的方法，不能用异步，因为会出现很多问题，返回值是一个boolean类型的
```
let ex = fs.existsSync("test.txt")  //返回true
```

* fs.stat(path[, options], callback)  查看某个文件或者某个文件夹的状态
* 这个方法可以有异步和同步，查看的关键几个属性有size(可以看到文件大小，单位是字节)还有创建时间和更新时间的时间戳
* 以上的文件都在callback的第二个参数data里面可以看到,而且data里面还有几个方法isFile()判断是否是文件
* isDirectory()判断是否是文件夹，一般是文件就不会是文件夹 所以两个是互斥的
```
let fs = require("fs")
let path = "G:/2345下载/360aqllq_9.1.0.362.exe"

fs.stat(path,(err,data)=>{
  if (err) return 
  console.log("看看文件描述",data)
  console.log("看看是否是一个文件",data.isFile())
  console.log("看看是否是一个文件夹",data.isDirectory())
})
```

* fs.unlink(path, callback)和fs.unlinkSync(path)  删除文件
* 删除文件比较简单，就是断开文件与磁盘的链接即可
```
let fs = require("fs")

fs.unlinkSync("Node学习")   //直接删除即可
```

* fs.readdir(path[, options], callback)  读取文件目录的目录结构，callback里面的第二个参数是一个字符串数组，每个元素就是
* 一个文件及或者文件的名字
```
let fs = require("fs")

fs.readdir("./",(err,data)=>{     //这里表示当前目录可以选择./或者.都行
  console.log("看看数据",data)
})
```

* fs.truncate(path[, len], callback)和fs.truncateSync(path[, len])  截断文件
* 将指定文件截断成需要的大小，单位为字节，一个中文是3个字节在utf-8里面，所以如果截断的量不匹配会出现乱码
```
let fs = require("fs")

fs.truncateSync("创建一下.txt",6)  //截断成只有6字节的文件
```

* fs.mkdir(path[, options], callback)和fs.mkdirSync(path[, options])  创建一个目录 或者说是文件夹
```
let fs = require("fs")

fs.mkdir("hello")
```

* fs.rmdir(path[, options], callback)和fs.rmdirSync(path[, options])  删除一个目录
```
let fs = require("fs")

fs.rmdirSync("hello")
```

* fs.rename(oldPath, newPath, callback)  对一个文件进行重命名
* 注意 这个方法不单单可以对文件进行重命名，还可以重新放到另一个目录下
* 相当于剪切文件
```
let fs = require("fs")
let path = "G:/2345下载/360aqllq_9.1.0.362.exe"

fs.rename(path,"./360下载.exe",(err)=>{
  console.log("成功")
})
```

* fs.watchFile(filename[, options], listener)  对一个文件进行监听
* 当一个文件进行变化的时候，就会触发这个里面的回调函数listener
* listener里面有两个参数，一个是当前文件的stat一个是修改之前的文件stat 这两个stat状态和上面的stat一样
* 能获取大小和创建时间等参数
* 这个方法监听的逻辑是隔一段时间查看一次，默认是5秒，但是如果要修改也是可以的，在options里面的一个参数interval可以做到
* 具体可以看这个[](http://nodejs.cn/api/fs.html#fs_fs_watchfile_filename_options_listener)
```
let fs = require("fs")

fs.watchFile("./创建一下.txt",(curr, prev)=>{   //其中curr是现在文件的状态,prev是之前文件的状态
  console.log("之前文件的大小",prev.size)
  console.log("现在文件的大小",curr.size)
})
```
#### fs简单命令汇总
```
1.fs.stat			检测是文件还是目录
2.fs.mkdir  		创建目录
3.fs.writeFile		创建写入文件
4.fs.appendFile 	追加文件
5.fs.readFile		读取文件
6.fs.rename  		重命名
7.fs.rmdir			删除目录
8.fs.unlink			删除文件
```
#### HTTP模块
* http模块是负责node的http传输功能模块
* 简单创建一个Http服务
* 使用http.createServer即可
```
	
	<!-- http.createServer((req,res)) -->
	<!-- req表示获取浏览器url传过来的信息 -->
	<!-- res表示响应给浏览器的信息 -->
	
var http = require('http');
http.createServer(function (request, response) {       
	<!-- 这里的writeHead表示写响应头200 -->
  response.writeHead(200, {'Content-Type': 'text/plain'}); 
  <!-- end表示给页面输出一句话并且结束响应-->
  <!-- 注意，这个end是一定要调用的，不然浏览器就会一直加载转圈圈-->
  response.end('Hello World');
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
```
* 如果服务端进行渲染，一定要设置一个浏览器的head编码为utf-8 不然会出现乱码
* 而且也要在响应头加上响应头的编码，不然也会出现乱码
```
const http = require("http")
http.createServer((req,res)=>{
	<!-- 在书写响应的时候，记得要加上响应头的编码，不然也会出现乱码 -->
	res.writeHead(200,{"Content-type":"text/html;charset='utf-8'"})
	<!-- 使用res.write能直接在html中输入任何标签，包括head -->
  res.write(`
    <head>
      <meta charset="UTF-8">
    </head>
  `)
  <!-- 如果上面没有设置UTF-8的head标签会出现乱码-->
  res.write("这是啥能生成不")
  res.end()
}).listen(9494,()=>{
  console.log("开启服务成功")
})
```
#### URL模块
* 在http请求的时候，客户端也就是web端是可以通过url传递信息的，或者post请求就是通过请求体传递信息
* 在通过Url传递信息的时候，服务端可以直接通过http.createServer中的req.url获取，但是获取的是一个字符串
* 所以需要一个模块专门将这个字符串进行解析
```
const url = require("url")

const web = "http://baidu.com?a=www&b=sss"

<!-- 当只传入url的地址时，可以获得整个url的属性 -->
console.log(url.parse(web))   						--->这里取到的是 query: 'a=www&b=sss',
<!-- 如果在第二个参数传入一个true，就会将传递的query直接转化成json格式 -->
console.log(url.parse(web,true).query)   			--->这里取到的是	query: [Object: null prototype] { a: 'www', b: 'sss' },
```
#### nodemon
* nodemon是一个Node自启动工具，当每次修改node的代码的时候，都需要手动重新启动一次node
```
node xxx.js
```
* 这样是非常低效的，所以引入了这个nodemon这个工具进行自启动，启动之后每次修改代码都会自动启动
* 使用之前先全局安装 npm install nodemon -g
* 然后就能代替命令行中的node 命令进行启动服务
```
nodemon xxx.js
```
#### 路由
* 路由可以理解成除去域名之后，在/后面加上的东西，这个值在后台是可以通过url模块获取到的，所以通过不同的路由。后台可以做不同的处理
```
const http = require("http")
const fs = require("fs")

http.createServer((req,res)=>{
  console.log(req.url)
  const pathname = req.url
  <!-- 其中访问 xxx域名/就能返回str数据 -->
  if (pathname === "/") {  
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"})
    const str = "这就是返回的数据"
    res.end(str)
	<!-- 如果是访问 xxx域名/home 就会返回obj数据 -->
  } else if (pathname === "/home") {
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"})
    const obj = JSON.stringify({
      home:"家里",
      computer:"电脑"
    })
    res.end(obj)
  }
}).listen(8080,()=>{
  console.log("启动成功")
})
```
## 服务器搭建前期准备工作
* 首先需要先在网上开通一个服务器，然后下载一个Xshell6，方便访问linux服务器
* 下载的Xshell 6 有些命令是还不能正常使用的，例如上传文件的rz命令，所以需要安装这个插件
```
//安装完这个就能使用这个rz命令   sz filename是下载文件
 yum -y install lrzsz
```
* 后面就是将Nodejs安装到linux服务器上
```
<!-- 下载node文件到服务器上有两种方法 -->
<!-- 第一个方法是在官网下载 -->
1.官网下载[nodeJS官网](http://nodejs.cn/download/)

<!-- 第二个方法是在服务端 -->
1.直接在linux服务端下载
wget https://npm.taobao.org/mirrors/node/v10.15.0/node-v10.15.0-linux-x64.tar.xz

2.下载完成后进行解压
xz -d node-v10.15.0-linux-x64.tar.xz
tar -xvf node-v10.15.0-linux-x64.tar

3.解压完进行安装 ,配置软连接，方便全局使用npm命令和node命令
ln -s /root/node-v10.15.0-linux-x64/bin/node /usr/local/bin/node
ln -s /root/node-v10.15.0-linux-x64/bin/npm /usr/local/bin/npm

4.测试一下安装成功没
node -v
npm -v

```
* 如果后面需要配置其他全局命令，例如pm2 则需要重新配置软管
* 下面是将npm install xxx -g 设置目录
```
首先进入Node的目录下
/usr/local/

然后输入以下命令
mkdir node_global

mkdir node_cache

npm config set prefix "node_global"

npm config set cache "node_cache"
```
* 当然 你觉得npm下载太慢了可以安装cnpm
* npm install cnpm -g --registry=https://registry.npm.taobao.org
* 顺便可以检查一下-g这个全局安装有没有按照之前设置的，安装到node_global文件下。
* cd node_global就可以查看
* 如果要使用cnpm这个全局命令也要配置软管
```
输入pwd  知道当前目录的位置
然后ln -s 目标文件 导入全局命令文件夹里  即可
ln -s /usr/local/node_global/bin/cnpm /usr/bin/cnpm  (-s 后面是接需要导入软管的文件 然后后面是导入到usr/bin这个全局命令文件夹里)

```
* 如果要正确的使用Node系统，记得配置pm2
* 首先npm install pm2 -g
* 安装完之后会得到一个安装之后的地方，用这个地址配置软管即可
```
ln -s 得到的地址 /usr/local/bin
```
## 小技巧
* 如果想在某个文件夹下打开cmd，直接在文件夹的路径行输入cmd即可，路径就是当前文件夹下的路径
## node服务简单搭建
* 新建一个server.js文件，填写如下代码即可
```
//引入express中间件
var express = require('express');
var app = express();

//指定启动服务器到哪个文件夹，我这边指的是dist文件夹
app.use(express.static('./build'));

//监听端口为3000
var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
```
## express框架
[express官网](https://www.expressjs.com.cn/)
* express是现在node.js的主流框架，和Koa一样，由同一个团队打造，Koa就会更轻而且更小，但是express还是有必要学习一下的
* 下面就是express的一些api和理解
* 首先是将express进行安装
```
npm install express --save
或者 cnpm install express --save
```
#### express配置服务器
* express帮我们封装了很多东西，所以很多时候我们之间调用即可
* 在使用请求中，多数有四种请求方式get post put 和 delete方式，其中get和post用得最多，其次就是put用于修改数据，还有delete用于删除数据
* 使用方法也很简单，将express实例化出来之后，之间使用app.xxx("路由",(req,res)=>{})就能拿到数据
```
const express = require("express")
const app = express()

app.get("/",(req,res)=>{
  res.send("首页")
})

app.get("/home",(req,res)=>{
  const obj = {
    home:"sdsd"
  }
  res.send(obj)
})

<!-- put请求一般是用来修改数据的 -->
app.put("/put",(req,res)=>{
  res.send("put请求")
})

<!-- delete请求一般用来删除数据 -->
app.delete("/delete",(req,res)=>{
  res.send("delete请求")
})

app.listen(8080,()=>{
  console.log("开启成功")
})
```
* 除了静态路由 还可以配置动态路由，使用req.params即可获取到
```
<!-- 这是从代码中获取路由后面的值 -->
app.get("/home/:id/:name",(req,res)=>{
  const id = req.params["id"]
  const name = req.params["name"]
  console.log(req.params)
  res.send(id)
})

<!-- 这时url中可以这样配置 https://xxx/id/name -->
```
#### get和post请求还有传递数据
* 在express中获取get或post传递的请求还是非常简单的，繁琐的部分都被封装好了，而且拿到的直接就是json格式的数据，非常方便
* get请求当中是直接从req.query里面拿值就行了，但是如果需要用到post请求则需要再在前面加个中间件，解析一下，不然会默认返回undefined
* 注意，post请求中的数据是在body里面的
```
<!-- get请求获取数据 -->
app.get("/home",(req,res)=>{
  const query = req.query
  console.log(query)
  res.send(query)
})
<!-- get请求时的url -->
http://localhost:8080/home?name=son&age=12

<!-- 如果使用post请求则需要用到中间件 -->
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post("/home",(req,res)=>{
	<!-- 请求值要从body里面拿，常识 -->
  const name = req.body
  console.log(name)
  res.send(name)
})
```
* 当然 有时候我们还需要一个请求进行多个异步操作 这个时候就需要用到next()
```
<!-- 第三个参数next执行了之后才会执行下面的方法 -->
app.get("/home",(req,res,next)=>{
  const query = req.query
  console.log(query)
  res.send(query)
  <!-- next执行了之后才会执行下面的方法-->
  next()
},(req,res)=>{
  console.log("这是啥")
})
```
#### 中间件 app.use()
* express的中间件有分很多种，大致分为以下几种
```
1.应用级中间件(常用)
2.路由级中间件
3.错误处理中间件
4.内置中间件
5.第三方中间件
```
* 1.应用级中间件
* 这个中间件的作用在于，在你读取某个路由之前或者之后需要做一些操作的时候，就可以使用中间件，他是一种从上往下的执行顺序
* 直到使用next()之后才会向下执行
```
app.use((req,res,next)=>{
	<!-- 在中间值中设置的req.header可以在下面的请求中获取到 -->
  req.header = "wdwd"
  next()
})

app.get("/home",(req,res)=>{
	<!-- 这里可以获取到req.header -->
  console.log(req.header)
  res.send("home")
})
```
* app.use("地址",路由或者方法) 所以app.use可以针对某一个路由进行拦截
* 或者我们可以把use和路由一起使用，就能拆开路由，变得很优美
```
<!-- 先建一个子路由 -->
const express = require("express")
var router = express.Router()

router.get("/name",(req,res)=>{
  res.send("name")
})
router.get("/age",(req,res)=>{
  res.send("age")
})
<!-- 最后把路由文件抛出 -->
module.exports = router
```
* 把上面抛出的子路由引入进主路由，然后放在use后面，所有的请求都会变成以/home开头的请求
```

const express = require("express")
const app = express()
<!-- 然后在主路由环境将子路由引入 -->
const router = require("./subRouter")

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

<!-- 放在use中间件后面即可 -->
app.use("/home",router)

app.listen(8080,()=>{
  console.log("开启成功")
})
```
* 2.路由级中间件(使用较少)
* 当需要一个路由匹配到之后，继续往下匹配，则可以使用路由级中间件
```
<!-- 使用关键字next进行继续往下执行 -->
app.get("/home",(req,res,next)=>{
  console.log("继续往下")
  next()
})
app.get("/home/:id",(req,res)=>{
  res.send(req.params)
})

```
* 3.错误处理中间件
* 当没有匹配到相应的路由时，所需要使用到的中间件，也是使用app.use进行拦截，但是是放在所有路由的最后，进行最后的拦截
```
<!-- 这里我们继续使用上面的例子，使用use进行最后的拦截，当最后状态为404时即返回404 -->
app.get("/home",(req,res,next)=>{
  console.log("继续往下")
  next()
})
app.get("/home/:id",(req,res)=>{
  res.send(req.params)
})
<!-- 当上面的所有路由都没匹配就返回404 -->
app.use((req,res)=>{
  res.status(404).send("404")
})
```
* 4.内置中间件
* 内置中间件可以理解为是一个用来匹配目录下的静态文件的中间件，可以通过特定的地址进行查找静态文件
* 我们可以使用path进行匹配，然后匹配到对应的静态文件
```
const path = require("path")
app.use(express.static(path.join(__dirname, 'dist')))
```
* 5.第三方中间件，就是使用npm下载的中间件，可以上npm.js上看就行，这里不具体举例
#### express配置cookie
* express没有内置的配置cookie的api，但是我们可以通过第三方中间件来实现这个功能
* 这里选择cookie-parser作为第三方中间件进行cookie的使用
* 首先安装cookie-parser
```
npm install cookie-parser --save
```
* 然后直接在代码里讲中间件初始化
* 其中获取cookies可以在req.cookies里面获取 设置cookie则可以在res.cookie设置，其中res.cookie支持以下方式
> cookie(name: string, val: string, options: CookieOptions): this;
> name为cookie名称，val为cookie值,options为默认配置，默认配置详细可以看npm中的cookie描述[](https://www.npmjs.com/package/cookie)
```
const cookieParser = require("cookie-parser")
<!-- 初始化cookieParser中间件 -->
app.use(cookieParser())

app.get("/home",(req,res)=>{
  res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
  console.log(req.cookies)
})
```