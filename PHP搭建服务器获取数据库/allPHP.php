<!-- 用户登录 -->

<!-- 当用gulp搭建的服务器访问php文件的时候，因为Php文件链接的数据库端口号
和gulp服务器的端口号不一样会涉及到跨域请求问题，所以要加上一个跨域请求头 -->
<!-- 跨域请求头：
 header('Access-Control-Allow-Origin:*') -->


<?php
header('content-type:text/html;charset=utf8'); //编译抬头，固定格式
$connect = mysqli_connect('localhost','root','root','test',3306); //链接数据库命令：地址、账号、密码、数据库名、端口号
if(mysqli_connect_error()){
	die('数据库连接错误');     //当数据库链接失败时触发，固定格式
}
//获取请求中的用户名和密码
$uname = $_REQUEST['username'];    //获取前端请求的数据REQUEST是get和post都能接收到
$pw = $_REQUEST['password'];        //还有$_GET和$_POST
//查询数据库
//书写sql语句 查询数据库 myuser是表名 WHERE后面是判断条件
$sql = "SELECT * FROM myuser WHERE username='$uname' AND password='$pw'";
//执行sql语句
$result = mysqli_query($connect,$sql);
//判断查询到的行数
$rows = mysqli_num_rows($result); //只有查询才需要用到这个rows
if($rows>0){
	//登陆成功要,发cookie
	setcookie('un',$uname,time()+24*3600); //设置cookie:cookie名称、cookie的值、cookie的持续时间(默认是没有持续时间的)
	setcookie('pw',$pw,time()+24*3600);  //取回cookie值用:echo $_COOKIE["cookie名称"]
	//在数据库中有该用户,登陆成功           //删除cookie使用:setcookie("user", "", time()-3600);  把持续时间减去就能删除cookie
	echo "1";
}else{
	//在数据库中没有该用户,登陆不成功
	echo "0";
}
?>


<!-- cookie获取 -->


<?php
include "./connect.php"; //这个是链接固定结构的php 不影响
$username = $_COOKIE['username'];
$password = $_COOKIE['password'];

//查询这条记录是否有
$sql = "SELECT * FROM info WHERE username='$username' AND password='$password'" ;
$result = mysqli_query($connect,$sql);
$rows = mysqli_num_rows($result);
if($rows>0){
	echo "欢迎回来".$username;
}else{
	echo "点击重新注册:<a href='http://localhost/1119/01zhuce.html'>注册</a>";
}



// cookie:一种身份证明,服务端通过他可以判断用户的身份
// php里面有一个变量叫$_COOKIE可以获取cookie数组
// cookie的特点:
// 大小有限制:4K左右
// 条数有限制:50条左右
// 读取有限制:同域读取
// 时效有限制:默认会话时效


// 用户注册

<?php
	header("content-type:text/html;charset=utf8");
    $connect = mysqli_connect("localhost","root","root","test",3306);
    if(mysqli_connect_error()){
        die("链接失败");
    }
	$username = $_REQUEST['un'];//用户名
	$password = $_REQUEST['pw'];//密码
	//获取请求参数和主体的数组:$_POST,$_GET,$_REQUEST

	//把用户插入数据库 info 是表名 
	$sql = "INSERT INTO info (username,password) VALUES ('$username','$password')"; 
	$result = mysqli_query($connect,$sql);
	if($result){
		//如果注册成功,为了下次可以直接登陆,给你发个通信证:cookie
		setcookie("username",$username,time()+24*60*60);
		setcookie("password",$password,time()+24*60*60);
		echo $username."注册成功";
	}else{
		echo "注册失败";
	}
?>


// 更新语句：UPDATE 表名 SET 字段名1='字段名1的值',字段名2='字段名2的值' WHERE 字段名1= '字段名1的值' 
// 删除语句DELETE FROM 表名 WHERE 字段名1= '字段名1的值'`