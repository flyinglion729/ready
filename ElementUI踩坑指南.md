## 首先安装的目录在Vue脚手架搭建指南里面附赠
#### 如果需要改变当前的Element.ui的样式，千万注意要先把VUE里面scoped关掉，但是这样也会影响到全局样式，但是没办法
* 因为Element渲染在页面上之后还会自己套上很多层盒子，所以这个时候注意可以去页面中试试看那个盒子是关于哪个的
* 具体查看到的标签可以直接在控制台下方截取css选择器进行选择 还是很方便的
* input框有属性可以自带后面icon标签，但是需要用到Element自己带的icon图标，不能用其他的 除非自己做
* 如果有多个tab框需要切换的时候设置样式可以这样操作DOM
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