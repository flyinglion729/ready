## 前端自封装函数
## Cookie使用
* 网上可以找到别人封装好的cookie使用
* 需要注意的是cookie的Opts配置
* 具体可以访问 [](https://juejin.cn/post/6844903953319067656)
* 大致配置指的是以下几种
```
expires		添加过期时间（UTC），告知浏览器应该在什么时候将其删除
path		告诉浏览器 cookie 所属的路径（默认值是当前页面的路径）
domain		cookie 所属的域（默认为当前域）
secure     	安全协议，设置了之后只能在https中携带cookie
HttpOnly  	这个字段只能在后端设置，设置了之后代表这个cookie不能由js进行操作

ex:
document.cookie = "userId=nick123; expires=Wed, 15 Jan 2020 12:00:00 UTC; path=/user; domain=mysite.com"
```
* 下面是封装好的cookie使用，只要在页面进行引用即可
* 在utils文件夹下新建一个cookie.js文件，复制下面代码在cookie.js里面
* 然后找到src文件夹下的index.js入口文件进行引入
```
<!-- index.js入口文件 -->
import "./utils/cookie"
```
* 具体代码
```
(function(global){
  function getCookiesObj() {
      //获得cookie对象
      const cookies = {};
      if (document.cookie) {
          const objs = document.cookie.split('; ');
          for (let i in objs) {
              const index = objs[i].indexOf('='),
                  name = objs[i].substr(0,index),
                  value = objs[i].substr(index+1,objs[i].length);
              cookies[name] = value;
          }
      }
      return cookies;
  }

  function set(sName,sValue,Opts) {
      //设置cookie
      // Opts expires,path,domain,secure
      if (sName && sValue) {
          let cookie = `${encodeURIComponent(sName)}=${encodeURIComponent(sValue)}`;
          
          if (Opts) {
              if (Opts.expires) {
                  const date = new Date();
                  // 设置多长时间，expires代表多少天
                  date.setTime(date.getTime()+Opts.expires*24*3600*1000)
                  cookie += `; expires=${date.toGMTString()}`;
              }
              if (Opts.path) {
                  cookie += `; path=${Opts.path}`;
              }
              if (Opts.domain) {
                  cookie += `; domain=${Opts.domain}`;
              }
              if (Opts.secure) {
                  cookie += '; secure';
              }
          }
          document.cookie = cookie;
          return cookie;
      } else {
          return '';
      }
  }

  function getCookie(name) {
      //得到某个cookie
      return decodeURIComponent(getCookiesObj()[name]) || null;
  }

  function getCookies() {
      //得到所有cookie
      return getCookiesObj();
  }

  function remove(name) {
      //移除某个cookie
      if (getCookiesObj()[name]) {
          const date = new Date();
          date.setDate(date.getDate()-1);
          document.cookie = `${name}=; expires=${date.toGMTString()}`;
      }
  }

  function clear() {
      // 移除所有cookie
      const cookies = getCookiesObj();
      const date = new Date();
      date.setDate(date.getDate()-1);
      for (let key in cookies) {
          document.cookie = `${key}=; expires=${date.toGMTString()}`;
      }
  }

  function noConflict(name) {
      //解决冲突
      if (name && typeof name === 'string') {
          if (name && window['cookie']) {
              window[name] = window['cookie'];
              delete window['cookie'];
              return window[name];
          }
      } else {
          return window['cookie'];
          delete window['cookie'];
      }
  }

  global['cookie'] = {
      set,
      getCookies,
      getCookie,
      remove,
      clear,
      noConflict
  };
})(window);
```
* 然后就能直接在组件中使用
```
console.log('----------cookie对象-------------');
            console.log(cookie);
            console.log('----------对象-------------');
            console.log(cookie.getCookies());
            console.log('----------设置cookie-------------');
            console.log(cookie.set('name', 'wlh'));
            console.log('----------设置cookie 123-------------');
            console.log(cookie.set('name', 'wlh123'));
            console.log('----------设置cookie age-------------');
            console.log(cookie.set('age', 20));
            // alert(document.cookie);
            console.log('----------获取cookie-------------');
            console.log(cookie.getCookie('name'));
            console.log('----------获取所有-------------');
            console.log(cookie.getCookies());
            console.log('----------清除age-------------');
            console.log(cookie.remove('age'));
            console.log('----------获取所有-------------');
            console.log(cookie.getCookies());
            console.log('----------清除所有-------------');
            console.log(cookie.clear());
            console.log('----------获取所有-------------');
            console.log(cookie.getCookies());
            console.log('----------解决冲突-------------');
            var $Cookie = cookie.noConflict(true /*a new name of cookie*/);
            console.log($Cookie);
            console.log('----------使用新的命名-------------');
            console.log($Cookie.getCookies());
```