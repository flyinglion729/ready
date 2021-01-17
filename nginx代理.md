## nginx
* 首先需要了解nginx可以干什么
#### nginx的作用
```
1.反向代理
2.负载均衡
3.动静分离
...
```
#### 负载均衡概念
* 当网页请求的数量非常高的时候，这个时候就需要做负载均衡的设置，
* 简单来说就是多建几个服务器，然后通过nginx做一个反向代理的左右，平均分给其他的服务器
```
web端(客户端) --->  nginx(反向代理服务器)端口9001 	--->端口8001服务器
												--->端口8002服务器
												--->端口8003服务器
```
#### 动静分离概念
* 就是为了加快网站的解析速度，可以把静态页面和动态页面放在不同的服务器进行解析
* html、css、js这种静态资源放在一台服务器，jsp servlet这种动态资源放在一台服务器中
## nginx的安装
* nginx一般是安装在linux系统中，下面是linux安装步骤
* 因为nginx官方提供的是C源码，所以需要自己进行编译，需要自己安装编码所需要的依赖环境才能正常编译
#### 安装pcre的依赖
```
<!-- 安装pcre的依赖 -->
1.第一步进行下载
wget    https://netix.dl.sourceforge.net/project/pcre/pcre/8.40/pcre-8.40.tar.gz
2.第二步解压安装包
tar -zxvf pcre-8.40.tar.gz
3.进入安装包目录
cd pcre-8.40
4.编译安装
<!-- 注意这一步有时候会因为linux里面没有c++环境而报一个错误
	You need a C compiler for C support.
	这个时候需要先安装c++环境，再进行./configure
	yum install -y gcc gcc-c++
 -->
./configure
make && make install
5.最后查看安装完成的版本
pcre-config --version
```
#### 安装其他需要的依赖
* 后续可一键安装以下四个依赖
```
yum -y install gcc zlib zlib-devel pcre-devel openssl openssl-devel
```
#### 最后安装nginx
[引用文章](https://www.cnblogs.com/hdnav/p/7941165.html)
* 首先，先移动到/usr/local/ 目录下进行安装
```
cd /usr/local/
```
* 可以直接使用linux的wget命令进行下载并安装
* 版本号取目前最新最稳定的版本即可
* 可以从官网上查询到[](https://nginx.org/en/download.html)
```
wget -c https://nginx.org/download/nginx-1.18.0.tar.gz
```
* 然后进行解压和配置
```
tar -zxvf nginx-1.18.0.tar.gz
cd nginx-1.18.0
./configure
```
* 最后进行编译和安装
```
make && make install
```
* 安装完成之后，具体使用Nginx需要在cd /usr/local/nginx/sbin/这个目录下
* 启动nginx和停止nginx
> ./nginx -s quit:此方式停止步骤是待nginx进程处理任务完毕进行停止。
> ./nginx -s stop:此方式相当于先查出nginx进程id再使用kill命令强制杀掉进
```
<!-- 启动nginx -->
./nginx 
<!-- 停止nginx -->
./nginx -s stop
./nginx -s quit 也是可以的
```
* 查询nginx版本号
```
./nginx -v
```
* 查询nginx进程
```
ps aux|grep nginx
```
* 最后可以在/usr/local的目录下发现多了一个nginx的文件夹，说明安装成功
* 在使用./nginx启动了nginx之后，是可以在浏览器中访问的
* 可以在nginx/conf 目录下找到nginx.conf
* 然后使用 vi nginx.conf 打开
* 其中的listen就是nginx占用的端口号，默认是80
* 然后用服务器的ip地址:80即可访问nginx的网站
```
...代码
server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }
		...代码

```
* 还有一点需要注意，因为在liunx里面默认是有防火墙是不能访问的，所以如果在你的服务器中防火墙是开着的
* 还需要配置端口供人访问
* 首先查看防火墙开放端口号
```
firewall-cmd --list-all
```
* 如果需要增加端口号并重启防火墙，输入以下指令即可
```
sudo firewall-cmd --add-port=80/tcp --permanet
firewall-cmd-reload
```
* 最后再看一下开放端口列表会发现多了一个80端口
#### 重启nginx有两种方式
* 第一种是先停止再重启(这个适用于没生效的情况下)
```
./nginx -s quit
./nginx
```
* 第二种是直接重启(这个适用于重新加载配置文件)
* 也就是说当你需要更改配置文件的时候即可使用
```
./nginx -s reload
```
* 为了不用一直切换地址来更改Nginx的配置 可以直接使用路径打开配置文件和重启nginx
```
配置nginx
vim /usr/local/nginx/conf/nginx.conf
重启nginx
/usr/local/nginx/sbin/nginx -s reload
```
## nginx的配置
#### nginx配置文件
* nginx的配置文件在nginx/config目录下的 nginx.conf
#### nginx分为三个部分
```
1.全局块
2.events块
3.http块
```
#### 全局块
* 全局块是从配置文件开始到events块之间的内容，主要影响nginx服务器整体运行的配置指令，
* 主要包括配置运行nginx服务器的用户(组)、运行生成work process数(也就是并发数，这个值要看服务器的硬件条件)
* 还有进程PID存放路径，日志存放路径和类型已经配置文件的引用等
* 一般默认配置是有workr_process这个值的 默认是1 也就是默认并发量为1
```
worker_processes  1;
```
#### events块
* events块涉及的指令主要影响nginx服务器与用户的网络连接
* 例如默认配置中有一条worker_connections 
* 代表支持用户连接的最大连接数
```
worker_connections  1024;
```
#### http块
* http块是配置中最频繁的一个部分，代理，缓存和日志定义等绝大多数功能和第三方模块的配置
* 都在这个http块上进行配置
> 需要注意的是，http块也可以包括http全局块和server块
```
1.http全局块配置的指令包括:
文件引用、MIME-TYPE定义、日志自定义、连接超时时间、单链接请求次数上限等

2.server块配置指令:
server块则与虚拟主机有密切关系，虚拟主机从用户角度上看，就是一台独立的硬件主机，主要是为了节约
硬件成本
```
> 注意 每个http块可以包含多个server块，是一对多的关系，同时一个server块可以理解成是一个虚拟主机
> 同时 每个server块还能包含多个location块
> 其中location指的就是路径
## 使用nginx配置反向代理
* 这里先描述简单的反向代理实现
* 在nginx.conf文件中编译
* vim nginx.conf 进行修改
> 其中linux的一些操作指令
```
vi 文件： 回车后就进入进入编辑模式，按 o 进行编辑

编辑结束，按ESC 键 跳到命令模式，然后输入退出命令：

1.保存不退出：

:w 保存文件但不退出vi 编辑

:w! 强制保存，不退出vi 编辑

:w file 将修改另存到file中，不退出vi 编辑

2.保存并退出：

:wq 保存文件并退出vi 编辑

:wq! 强制保存文件并退出vi 编辑

3.不保存并退出：

q: 不保存文件并退出vi 编辑

:q! 不保存文件并强制退出vi 编辑

:e! 放弃所有修改，从上次保存文件开始在编辑
```
[](https://www.cnblogs.com/sxshaolong/p/11706223.html)
配置nginx

重启nginx
/usr/local/nginx/sbin/nginx -s reload
* 首先配置先把需要配置配置代理的网页在配置文件中修改一下
* 这里需要解释一下 其中server部分的server_name表示前端需要访问的host名称
* listen表示访问端口，所以这里前端访问的路径就是http://129.204.128.165(80是默认端口可以不加)
* 然后下面的location是重点
* 第一个location为 / 表示当你访问http://129.204.128.165 的时候会被转发到http://129.204.128.165:30001这个服务
* 第二个location为 129.204.128.165/test的时候 会被转发到 http://129.204.128.165:30001/test 这个服务
```
<!-- 打开配置文件 -->
vim /usr/local/nginx/conf/nginx.conf

<!-- 然后使用o进入编辑模式 -->
<!-- 修改http块中的server部分 -->
server {
        listen      80;
        server_name  129.204.128.165;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            proxy_pass http://129.204.128.165:30001;
            add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS;
			<!-- 这个表示请求的响应是否可以暴露于该页面 -->
			add_header Access-Control-Allow-Credentials true; 
			<!-- 这个表示预检请求头，默认的几个会列出来，但是如果不需要预检其他的请求头就不需要添加 -->
			// add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
        }

        location /test {
            proxy_pass http://129.204.128.165:30001;
            add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS;
			<!-- 这个表示请求的响应是否可以暴露于该页面 -->
			add_header Access-Control-Allow-Credentials true;
			<!-- 这个表示预检请求头，默认的几个会列出来，但是如果不需要预检其他的请求头就不需要添加 -->
			// add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
        }

```
* 这里有一个坑，就是proxy_pass后面加/和不加/是有区别的
* 当你在http://129.204.128.165:30001这个转发后面加了 / 之后
* 变成proxy_pass http://129.204.128.165:30001/; 则表示这是一个完整的转发 不会携带location上的路径
* 也就是前端访问路径则变成 http://129.204.128.165:30001/
* 如果你没加 / 则 proxy_pass http://129.204.128.165:30001; 
* 前端访问的路径就会带上location上的路径 ahttp://129.204.128.165:30001/test;
> 下面摘录网页的网友分享的一个实例说明加 / 和不加 / 的区别
```
server {
        listen 80;
        server_name www.zhanghehe.com.cn;

        location / {
                proxy_pass http://192.168.80.11:80;
        }

        location /administrator {
                proxy_pass http://192.168.80.11/admin;
        }

        location /images {
                proxy_pass http://192.168.80.11/images/;
        }
}

第二个location没有加/号，表示如果用户访问的是www.zhanghehe.com.cn/administrator就将其转发到
http://192.168.80.11/admin/administrator下，不加/的时候，要用proxy_pass的内容替换所属location后的第一个/。

第三个location表示，如果用户访问的是www.zhanghehe.com.cn/images的话就将其转发到
http://192.168.80.11/images/目录下，加上/的时候，表示完整的替换。
```
* 当我们需要跨域用到别的网页中的cookie时，单单这样配置是无法获取的
* 所以我们需要在增加一个cookie.domain
```
location / {
     <!-- 页面地址是a.com，但是要用b.com的cookie -->
    proxy_cookie_domain b.com a.com;  #注意别写错位置了 proxy_cookie_path / /;
    proxy_pass http://b.com;
}  
```
#### nginx location配置
* location有自己的语法规则，具体规则为以下符号。
> 语法规则: location [=|~|~*|^~] /uri/ { … }
```
 "=" 			表示精准匹配 例如 location = / {} 就只会匹配根路径下的路由/ 是匹配不到/test的
 "^~" 			表示uri以某个常规字符串开头，理解为匹配 url路径即可。nginx不对url做编码，因此请求为/static/20%/aa，可以被规则^~ /static/ /aa匹配到
 "~" 			表示区分大小写的正则匹配  这里需要注意，这个符号表示以xx结尾
				例如: location ~ \.(gif|jpg|png|js|css)$ {} 注意：是根据括号内的大小写进行匹配。括号内全是小写，只匹配小写
 "~*"			表示不区分大小写的正则匹配   注意 这里也是以xx结尾 同上
 "!~"和"!~*""	分别为区分大小写不匹配及不区分大小写不匹配 的正则 注意 这里也是以xx结尾 同上
 "/"			最后这个则表示所有请求都会接受
```
* 在实际场景中，后台接口返回的路由往往是很多个的，这个时候其实我们使用'/'所有请求都会接收到即可
* 举个例子
* 我们先在nginx的location处匹配一个路由
```
<!-- nginx -->
		listen      80;
        server_name  xxx.xxx.xxx.xxx;
		location / {
            proxy_pass http://yyy.yyy.yyy.yyy:30001;
            add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS;
        }
```
* 然后我们在客户端上请求nginx服务器的xxx.xxx.xxx.xxx:80的所有请求
* 都会被转发到http://yyy.yyy.yyy.yyy:30001
* 而且，如果请求地址为
```
xxx.xxx.xxx.xxx:80/test
<!-- 路由也会被带上进行请求转发，也就是说会转到以下地址 -->
http://yyy.yyy.yyy.yyy:30001/test
```
## 使用nginx部署前端静态服务器
* 除了使用普通的node服务将前端web服务跑起来，还有可以使用Nginx也能将前端服务部署上去
* 新建一个serve即可
```
location ~ / {
​
        root /data/www/my-app/dist;
​
        index index.html;
​
​
        if ($request_filename ~ .*\.(htm|html)$)
        {
            add_header Cache-Control no-store;
        }
​
        try_files $uri $uri/ /index.html;
    }
```