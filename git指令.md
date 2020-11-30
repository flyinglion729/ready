## 删除远程仓库的某文件
```
把xxx.iml加到`.gitignore`里面忽略掉，然后提交使.gitignore生效，也既是

　　git rm -r --cached xxx.iml　　//-r 是递归的意思   当最后面是文件夹的时候有用

　　（git add xxx.iml）　　　　　 //若.gitignore文件中已经忽略了xxx.iml则可以不用执行此句

　　git commit -m "ignore xxx.xml"

　　git push
```
## 回滚至git仓库
```
回退命令：


$ git reset --hard HEAD^         回退到上个版本
$ git reset --hard HEAD~3        回退到前3次提交之前，以此类推，回退到n次提交之前
$ git reset --hard commit_id     退到/进到 指定commit的sha码


强推到远程：

$ git push origin HEAD --force
```
## 替换远程git仓库的url
```
1. 修改命令
git remote set-url origin <URL> 更换远程仓库地址。把<URL>更换为新的url地址。

2.先删后加
git remote rm origin
git remote add origin git@github.com:Liutos/foobar.git
```
## git清除暂存区文件重新上传
```
git rm -r --cache .
<!-- 然后使用git add . -->
```
## 生成目录树
```
tree /f > list.txt
```
## git某一分支完全覆盖另一分支
```
假设每个人有个开发分支，想隔一段时间就把自己的开发分支上的代码保持和测试分支一直，则需要如下操作：

1.我想将test分支上的代码完全覆盖dev分支，首先切换到dev分支
git checkout dev
2.然后直接设置代码给远程的test分支上的代码
git reset --hard origin/test

3.执行上面的命令后dev分支上的代码就完全被test分支上的代码覆盖了，注意只是本地分支，这时候还需要将本地分支强行推到远程分支。
git push -f
```
## git删除远程分支
```
<!-- 查看远程分支 -->
git branch -a

<!-- 删除远程分支 -->
git push origin --delete <branchName>

<!-- 删除本地分支 -->
git branch -d <BranchName>
```
## git拉取远程仓库分支到本地
```
git fetch origin dev（dev为远程仓库的分支名）
```
## js获取GTM时间
```
new Date().toGMTString()
```
## js使用模板字符串的时候去除空格
```
` ww w `.replace(/\s*/g,"")  ==> www
```