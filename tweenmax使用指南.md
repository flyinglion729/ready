## Tweenmax介绍
* tweenmax是一个很强大的动画库，里面集成了很多其他css和js的插件，兼容性非常强大，还适用于h5
* 使用起来是非常丝滑的，在制作一些炫酷的特效动作时完全可以使用这个来实现
* [Tweenmax地址](https://www.tweenmax.com.cn/api/tweenmax/TweenMax.from())
## Tweenmax基本使用
#### Tweenmax.to
* TweenMax.to( target:Object, duration:Number, vars:Object ) : TweenMax
* vars = 动画参数（CSS属性、延迟、重复次数等
> 以下是vars 这个Object初始化的属性
> 注意：以下的属性有些是不全的，只获取了多数常用的，如果要更完善属性可以上官网查看
```
delay:Number --- 3  
	动画开始之前的延迟秒数（以帧为单位时则为帧数）。
ease:String or Fcuntion --- Power1.easeOut
	过渡效果的速度曲线（缓动效果）。
	你可以在动画的参数中设置各种缓动来控制动画的变化率，赋予其特定的“感觉”。
	例如Elastic.easeOut或 Strong.easeInOut。默认是Power1.easeOut。
	TweenLite中包含了基本缓动：Power0、Power1、Power2、Power3、Power4、Linear、Quad、Cubic、Quart、Quint、Strong
paused:Boolean --- false
	如果设置为true，动画将在创建时立即暂停。默认false
	ex:
		tween = new TweenMax('.box', 3, {
		    x: 500,
		    paused: true
		});
		
		playBtn = document.getElementById("playBtn")
		playBtn.onclick = function() {
		    tween.play();
		}
immediateRender:Boolean 
	立即渲染，默认false。
	这个值不常用，注意：当使用tweenmax.from()的时候是立即渲染的 可以用这个值让他不立刻渲染
useFrames:Boolean
	当设置为true时，对这个TweenMax对象的时间计算方式基于帧而不是秒，一般帧速约为16.66ms（60帧/秒）。
repeat:Number
	动画在第一次完成后应重复的次数。
	例如，如果repeat为1，则动画将总共播放两次（初始播放加1次重复）。要无限期重复，请使用-1。repeat应该始终是一个整数。
repeatDelay:Number
	每次重复之间的秒数（或帧）。
	例如，如果repeat是2并且repeatDelay是1，则动画将首先播放，然后在重复之前等待1秒，然后再次播放，然后再等待1秒再进行最后的重复。
yoyo:Boolean
	如果设置yoyo为true，那么重复的动画将往返进行。默认为false。注意要喝repeat搭配使用
	例如当你设置了repeat:2，如果没设置yoyo，那么动画是这样的123-123-123
	如果设置了yoyo，动画则是123-321-123
startAt:
	设置动画属性开始时的值
	ex:TweenMax.to(mc, 2, {x:500, startAt:{x:200}})
```
> 以下是vars Object中的动画回调事件
```
onComplete: Function
	在动画结束时触发此回调函数。
onStart: Function
	当动画开始渲染时执行此事件函数，有可能会被执行多次，因为动画是可以重复开始的。
onUpdate: Function
	当动画发生改变时(动画进行中的每一帧)不停的触发此事件。
onRepeat: Function
	在每次动画重复时(repeat)执行此事件函数。
```
> 以下是vars Object中动画播放组件
```
.play( from:*, suppressEvents:Boolean ) : *
	控制动画正向播放, from 是从第几秒开始
	suppressEvents 表示如果从第几秒开始 是否触发之前的事件 默认true
.pause( atTime:*, suppressEvents:Boolean ) : *
	暂停动画 和上面一样
.paused()
	获取当前的暂停状态
.restart( includeDelay:Boolean, suppressEvents:Boolean ) : *
	重新开始动画
	includeDelay表示是否包括delay
.resume( from:*, suppressEvents:Boolean ) : *
	恢复播放而不改变方向
.seek( time:*, suppressEvents:Boolean ) : *
	不改变状态直接跳转到某个点

```
> 实例方法
```
.kill( vars:Object, target:Object ) : *
	消灭动画
```
* Tweenmax.to方法中有两种常用方式，第三个参数vars中Object可以直接使用移动或者使用方法，方法中可获取到当前Dom的个数
```
<!-- 方式一 ，适合单个dom进行移动-->
const myTween = TweenMax.to(".box", 1, {
  x: 100
})

<!-- 方式二，x中的参数可以控制多个.box类名的dom的实际dom -->
const myTween = TweenMax.to(".box", 1, {
  x: function(index, target) {
    console.log(index, target);
    return (index + 1) * 100 // 100, 200, 300
  }
})
```
#### TweenMax.from()和TweenMax.fromTo()
* TweenMax.from( target:Object, duration:Number, vars:Object ) : TweenMax
* TweenMax.from比较简单，可以理解成是TweenMax.to()的反过来，从末尾开始返回
* 所以这里直接介绍TweenMax.fromTo()
* TweenMax.fromTo( target:Object, duration:Number, fromVars:Object, toVars:Object ) : TweenMax
* TweenMax.fromTo相比TweenMax.from更厉害一点是可以指定动画的开始点和结束点
```
TweenMax.fromTo('.box', 3, {x: 200,},{x: 500,})
```
#### 