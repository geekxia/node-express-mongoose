## 项目启动

```
mongod --dbpath "D:\mongodb\data"
npm start
```
* 使用PostMan测试接口
* 使用Robo3T查看数据库中的数据

## 使用mongoose

```
npm install mongoose -S
```
创建数据库连接：
```
// 引入模块
var mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://localhost/express-project')

var db = mongoose.connection
db.on('error', (err)=>{
  console.log('数据库连接错误')
})
db.once('open', ()=>{
  console.log('数据库连接成功')
})
```
创建Model：
```
var userSchema = mongoose.Schema({
  username: String,
  password: String
})
var userModel = mongoose.model('users', userModel)
```

## GET/POST请求

```
let { id } = req.query
let { username, password } = req.body
```
* 表单数据：`x-www-form-urlencoded`
* 文件数据: `form-data`



## 1、实现注册功能

res.render('regist', {})
编写userModel文件
编写注册接口

## 2、实现登录功能

res.render('login', {})
编写登录接口

## 实现文章发布功能

res.render('write', {})
编写aricleModel文件
编写articles.js路由文件，并在app.js中进行配置
编写文章新增接口

## xheditor文件上传

前端配置xheditor
编写图片上传接口

## 实现首页、分页查询

res.render('index', {})
编写文章列表接口(page,pagesize)
实现分页

## 实现文章编辑功能

点击编辑，跳转至 write.ejs 页面，并执行初始化渲染
修改文章新增接口，复用于编辑

## 实现文章删除

编写删除接口

## 实现文章详情

点击详情，跳转至 res.render('detail', {})

## 实现登录拦截

```
npm install express-session -S
```
* 在app.js中配置session
* 在登录接口中，登录成功时设置session
* 在app.js中app.get(`*`)，拦截除 login 和 regist 以外的路由

## 实现退出登录

在 /users/logout 接口中销毁Session即可

## token 实现

用于前后端分离的情况下
