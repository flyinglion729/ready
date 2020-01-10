// 引入文件：var xx = require("xx")
// 抛出文件: module.exports = {
//          xx:xx
// }


var url = require("url")  //能将来源的网址解码为路由和参数模块
                          //var string = url.parse()    //解码网站
                          //var pathname = string.pathname  //获取网站的路由
                          //var query = string.query  //获取网站传递过来的参数 可以使用下面的queryString方法转成JSON格式

var querystring = require("querystring");  //能将传过来的?a=2&b=3转化为{a:2,b:3}的json格式 querystring.parse()
                                            //querystring.stringify()能将json转回来

var path = require("path") //查找本地地址模块，专门读取本地文件地址   ..可以利用url的路由进行拼接路径
                            //path.join(__dirname,"www",pathname)   绝对地址，当前文件夹下的某个路由指向的文件
                            //path.join("./","www",pathname)    相对地址，也可以按照需要设置为某个路由指向的相对地址 、但是由于不用的操作系统相对路径的表达方式不一样
                                                                            //所以一般使用绝对路径，这样不容易出Bug
                            //path.resolve("./","www",pathname)   resolve这个方法能将相对的路径也转成绝对路径,不管输入的是相对路径还是绝对路径 都会变成绝对路径

var fs = require("fs") //文件模块，读取和写入文件
                        // fs.readFile(filename,function(err,data){  //读取文件
                        //      ...回调函数代码 err为错误，data为具体读到的数据  filename是具体的绝对路径地址就是上面拼接下来的产物
                        //                ***注意 读取到的数据data 是为二进制的或者16进制 所以需要用data.toString()解码为字符串格式
                        //     
                        //          if(err){
                        //              return 
                        //          }
                        //          console.log(data.toString())
                        // })
                        // fs.writeFile(filename,data,function(){  //文件的写入 也叫复制文件
                        //          console.log("文件拷贝完成")     //第一个参数是需要导入文件的路径 第二个参数是需要复制的文件 第三个参数是回调函数
                        // })
                        var fs = require("fs");
                        var path = require("path");
                        
                        var now = path.join(__dirname,"www","index.html");
                        fs.readFile(now,(err,data)=>{
                            if (err) {
                                console.log("读取失败")
                            }
                            var newdata = data.toString();
                            var newpath = path.resolve("./",'www',"super.html")
                            fs.writeFile(newpath,newdata,function(){
                                console.log("写入成功")
                            })
                        })
                        
                

var http = require("http")  //设置服务器模块

                        var http = require("http");
                        var fs = require("fs");
                        var path = require("path");
                        var url = require("url")

                        var server = http.createServer();   //创建一个服务器
                        server.on("request",function(req,res){  //一个获取服务器请求的事件 第一个参数是请求的信息，第二个参数是响应的信息
                            var urlString = req.url;         // req.url 能获取前端发过来的请求完整地址方便下面使用

                            var pathname = url.parse(urlString).pathname;   //用url模块中的url.parse拆开地址获取路由
                            if(pathname=="/"){
                                pathname = "index.html"        //设置当用户输入其他类似网址会跳转到当前的网页
                            }
                            if(pathname=="/index"){
                                pathname = "index.html"
                            } 
                            var target = path.join("./",'www',pathname)  //用path模块将上面的路由和本地路径进行拼接 找到想要请求到的文件
                            fs.readFile(target,(err,data)=>{
                                if (err) {
                                    res.end("503，服务器响应失败")   //如果服务器读取文件失败则返回
                                }
                                res.end(data);   //res.end() 括号里面可以返回给前端的数据 如果服务器成功读取文件则把文件返回给前端
                            })                   //第二个参数data能获取到读取的文件
                        })
                        server.listen(8080)   //web服务器开始监听8080端口 这个是必须要加上的


// nodemon 文件名  可以时刻监听文件变化并刷新网页
                    