//方法一:设置cookie
function setCookie(key,value,day){
	var date = new Date();
	date.setDate(date.getDate()+day);
	document.cookie = key+"="+value+";expires="+date.toString();
}
setCookie('demo','teacher',5)
setCookie('id',111,5)
//方法二:删除cookie
function removeCookie(key){
	setCookie(key,1,-1);
}

//方法三：获取cookie
function getCookie(key){
	var str = document.cookie;
	//字符串转数组格式
	var arr = str.split('; ');
	for(var i=0;i<arr.length;i++){
		var newArr = arr[i].split('=');
		if(newArr[0]==key){
			return newArr[1];
		}
	}
}