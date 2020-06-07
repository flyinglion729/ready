## 前端的加密方法
* 理论上来说，前端做任何加密处理都是不安全的，因为任何行为在信息传输的过程中都有可能被各种代理所劫持
* 而且就算加密了，在被劫持了之后还是能够解密的，或者再次发送请求
#### 加密算法
* 加密算法和哈希算法不一样，加密算法是可逆的，而且其加密之后生成的密文长度和明文本身的长度有关，
* 所以如果未来需要被保护的数据能解密成明文则使用加密算法
* 加密算法也有两种：对称加密和非对称加密
###### 对称加密
* 对称加密是一种最简单，最高效的加密方式，因为加密和解密都是使用同一套密匙
* 对称加密通常使用较小的密匙，一般小于256bit，如果你的密匙长度只有1bit，黑客只要尝试使用0或者1来解析即可
* 但是如果你的密匙长度太长到了1mb，那黑客可能永远无法解密，但是你也牺牲了你的解密时间，所以为了权衡两个方面
* 一般采用比较小但是不会很小的密匙
* 下面是一个2000年美国标准于技术研究会发明的对称加密算法AES
```
//加密过程
private string myData = "hello"; 
private string myPassword = "OpenSesame"; 
private byte[] cipherText; 
private byte[] salt = { 
  0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x5, 0x4, 0x3, 0x2, 0x1, 0x0 
}; 
private void mnuSymmetricEncryption_Click(object sender, RoutedEventArgs e){ 
  var key = new Rfc2898DeriveBytes(myPassword, salt); 
  // Encrypt the data.
  var algorithm = new RijndaelManaged();
  algorithm.Key = key.GetBytes(16);
  algorithm.IV = key.GetBytes(16); 
  var sourceBytes = new System.Text.UnicodeEncoding().GetBytes(myData); 
  using (var sourceStream = new MemoryStream(sourceBytes)) 
  using (var destinationStream = new MemoryStream()) 
  using (var crypto = new CryptoStream(sourceStream, algorithm.CreateEncryptor(), CryptoStreamMode.Read)){
    moveBytes(crypto, destinationStream);
    cipherText = destinationStream.ToArray();
  }
  MessageBox.Show(String.Format(
    "Data:{0}{1}Encrypted and Encoded:{2}",myData,Environment.NewLine,Convert.ToBase64String(cipherText)
  ));
} 

private void moveBytes(Stream source, Stream dest){ 
  byte[] bytes = new byte[2048]; 
  var count = source.Read(bytes, 0, bytes.Length); 
  while (0 != count){
    dest.Write(bytes, 0, count);
    count = source.Read(bytes, 0, bytes.Length);
  }
}
```
```
//解密过程
private void mnuSymmetricDecryption_Click(object sender, RoutedEventArgs e){ 
  if (cipherText == null){
    MessageBox.Show("Encrypt Data First!"); 
    return;
  } 
  var key = new Rfc2898DeriveBytes(myPassword, salt); 
  // Try to decrypt, thus showing it can be round-tripped.
  var algorithm = new RijndaelManaged();
  algorithm.Key = key.GetBytes(16);
  algorithm.IV = key.GetBytes(16); 
  using (var sourceStream = new MemoryStream(cipherText)) 
  using (var destinationStream = new MemoryStream()) 
  using (var crypto = new CryptoStream(sourceStream, algorithm.CreateDecryptor(),CryptoStreamMode.Read)){
    moveBytes(crypto, destinationStream); 
    var decryptedBytes = destinationStream.ToArray(); 
    var decryptedMessage = new UnicodeEncoding().GetString(decryptedBytes);
    MessageBox.Show(decryptedMessage);
  }
}
```
* 常见的对称加密算法有DES、3DES、Blowfish、IDEA、RC4、RC5、RC6和AES
* 注意 注意 注意 由于前端的透明性，对于登录密码等敏感信息，就不要使用这种对称的方式进行加密，因为一旦有黑客拦截到密匙就能
* 直接解密。其中对称密匙的一大缺点就是密匙的管理和分配，换句话说就是你怎么将你手中的密匙交给那个需要解密的人，中途是很容易被
* 黑客进行拦截的，现实生活中通常的做法就是将密匙进行非对称加密 emmm
###### 非对称加密
* 非对称加密为数据提供了一种非常安全的加密方法，非对称加密由一对密匙组成，分为私钥和公钥，私钥由一方安全保管，不能泄露他人
* 而公钥则可以发给任何请求他的人，非对称加密中，公钥用来加密，而私钥则用来解密
* 例如，银行向你发放一个公钥，你用公钥进行加密，然后传输给银行，只有银行拥有的私钥才能用来解密，其他人拿到这个公钥也没办法
* 因为在传输的过程中，银行不需要传输私钥，所以安全性大大的提高了
* 目前最常用的非对称加密就是RSA算法下面是例子
```
//加密算法
private byte[] rsaCipherText; private void mnuAsymmetricEncryption_Click(object sender, RoutedEventArgs e){ 
  var rsa = 1; 
  // Encrypt the data.
  var cspParms = new CspParameters(rsa);
  cspParms.Flags = CspProviderFlags.UseMachineKeyStore;
  cspParms.KeyContainerName = "My Keys"; 
  var algorithm = new RSACryptoServiceProvider(cspParms); 
  var sourceBytes = new UnicodeEncoding().GetBytes(myData);
  rsaCipherText = algorithm.Encrypt(sourceBytes, true);
  MessageBox.Show(String.Format(
    "Data: {0}{1}Encrypted and Encoded: {2}",myData,Environment.NewLine,Convert.ToBase64String(rsaCipherText)
  ));
```
```
//解密过程
private void mnuAsymmetricDecryption_Click(object sender, RoutedEventArgs e){ 
  if(rsaCipherText==null){
    MessageBox.Show("Encrypt First!"); 
    return;
  } 
  var rsa = 1; 
  // decrypt the data.
  var cspParms = new CspParameters(rsa);
  cspParms.Flags = CspProviderFlags.UseMachineKeyStore;
  cspParms.KeyContainerName = "My Keys"; 
  var algorithm = new RSACryptoServiceProvider(cspParms); 
  var unencrypted = algorithm.Decrypt(rsaCipherText, true);
  MessageBox.Show(new UnicodeEncoding().GetString(unencrypted));
}
```
* 常见的非对称加密算法有：RSA、ECC（移动设备用）、Diffie-Hellman、El Gamal、DSA（数字签名用）
###### 对称密匙和非对称密匙常用方式
* 虽然非对称密匙非常的方便，但是由于解密非常的缓慢，所以一般还是使用对称密匙进行传送消息，但是使用非对称密匙给对称密匙进行加密
* 这样确保安全的同时也能确保解密速度
```
假设现在有一个这样的场景
1.Alice需要去银行做一个交易，首先他的浏览器会生成一个对称密匙，用于将消息内容存储进去，
2.然后Alice的浏览器向银行索要一个非对称的公钥
3.银行将公钥给到Alice
4.Alice的浏览器将这个公钥把刚刚存储了信息的对称密匙加密
5.Alice再把这个加密后的对称密匙发给银行
6.银行使用私钥将Alice的加密之后的对称密匙解密获取内容
```
#### 哈希(hash)加密算法
###### 哈希算法的简介
* 哈希算法是将目标文本转化成具有相同长度的字符串，理论上是无论多长的文本，都会通过算法h生成一个相同长度的字符串
* 所以是一个多对一的映射关系，是没有办法做到可逆的，所以哈希算法是不可逆的，而且当输入改变的时候，哈希算法得出的结果也是不一样的
* 所以基于哈希算法的特性，通常用来处理不需要转换回明文的文本特性
* 比较常用的哈希算法是MD5 和 SHA1
```
在我们比较熟悉的应用场景中是，当我们登陆一个已经注册过的网站的时候，选择重置密码
这个时候网站就会向你发送一个随机的密码或者一个邮箱激活链接，而不是将之前的明文密码发给你
这就是因为哈希算法是不可逆的
```
* 注意 注意 注意  需要注意的是，如果要在浏览器端使用哈希算法，也要在服务端上进行哈希加密，才能对应上
* 因为这样一来，服务器端就不需要将密文转化成明文进行对比密码了，另一方面是一旦加密算法和密匙泄露，整个用户资料库都相当于明文存储了
* 如果前端传过来的值是明文，那么也要将其哈希话之后存储，下次登录的时候哈希进行对比即可
###### 哈希算法的攻击方式
* 哈希算法的攻击方式一般有两种：寻找碰撞法和穷举法
* 所以为了数据的进一步安全，可以在哈希算法的基础上进一步加密，其中进一步加密的方式就是：加盐、慢哈希、密匙哈希、XOR等
###### 加盐
* 加盐加密是将同一个口令和一串n位随机数相关联的的加密方式
* 为了更好的理解，引用一篇文章进行说明[](https://blog.csdn.net/jblock/article/details/78446604)
```
简单理解就是，
当用户进行注册的时候，由系统生产一串随机的Salt值，然后将密码和这串随机值连接起来产生Hash值
然后将Hash值和Salt值分别存储在数据库中
在下次登录的时候，获取到用户的登录信息，再将数据库中唯一的Salt值进行组合生产一个Hash值
再将整个Hash值和数据库中的Hash值进行对比即可
```
* 注意 注意 注意 但是这种加盐的加密方式还要注意两点
```
1.短盐值：
如果盐值太短，那么就可以使用多次尝试来进行破解，加入只有3个ASCII字符，那么只有95*95*95种可能，就很容易被破译
2.盐值复用
在项目开发的过程中，有时会遇到将盐值写死，或者只有第一次生成随机的Salt值后面都重复使用这个值的情况
这样的加盐方式是无效的
举个栗子：如果两个用户的密码是一样的，那么他们就会有相同的Hash值，那么他们就可以用反向侦查法进行反向破译
```
* 所以正确的加盐方式应该遵循以下规则
```
1.盐值应该使用加密的安全伪随机数生成器产生，比如C语言的RAND函数
2.盐值混入文本中，一起使用标准的加密方式
3.盐值要足够长，（经验所得，盐值至少要跟哈希值函数输出一样长）且永不重复
4.盐值最好由服务端提供，前端取值使用
```
###### 使用MD5哈希算法做实例
* 有一篇很好的文章说明这个:[](https://www.f2td.com/2018/11/13/encrypt-the-user-password-with-md5/)
* 首先先下载MD5加密方式npm install md5 -S
* 然后
#### 补充base64编码
* 在严格意义上来说，base64不算是加密，只能说是编码
* 在Js中也有方法编码和解码base64
```
//1.编码
var result = Base.encode('shotCat好帅!');  //--> "c2hvdENhdOWlveW4hSE="

//2.解码
var result2 = Base.decode(result); //--> 'shotCat好帅!' 没错,我就是这么不要脸!!!	
```
## HTTP和HTTPS
* 网上有一篇很不错的文章描述了这个区别和整个网络请求过程
* [](https://juejin.im/post/5a069b6d51882509e5432656)