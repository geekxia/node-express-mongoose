var express = require('express');
var router = express.Router();
var userModel = require('../db/userModel')

/* GET users listing. */
router.get('/getUserList', function(req, res, next) {
  console.log('有请求来了')
  userModel.find().then((docs)=>{
    console.log('查询成功', docs)
    res.send({err: 0, msg: 'success', data: docs})
  }).catch((err)=>{
    console.log('查询失败', err)
    res.json({err: -1, msg: 'fail'})
  })
});


// 注册接口
router.post('/regist', (req, res, next)=>{
  // 接收POST数据
  let { username, password, password2 } = req.body
  // 数据校验工作，在这里完成
  // 查询是否存在这个用户
  userModel.find({username}).then((docs)=>{
    if (docs.length > 0) {
      res.send('用户名已存在')
    } else {
      // 开始注册
      let createTime = Date.now()
      // 插入数据
      userModel.insertMany({ username, password, createTime }).then((data)=>{
        // res.send('注册成功')
        res.redirect('/login')
      }).catch((err)=>{
        // res.send('注册失败')
        res.redirect('/regist')
      })
    }
  })
})


// 登录接口
router.post('/login', (req, res, next)=>{
  // 接收POST数据
  let { username, password } = req.body
  console.log(username, password)
  // 操作数据库
  userModel.find({ username, password }).then((docs)=>{
    if (docs.length > 0) {
      // res.send('登录成功')
      // 登录成功后，在服务端使用session记录用户信息
      req.session.username = username
      req.session.isLogin = true
      res.redirect('/')
    } else {
      // res.send('用户不存在')
      res.redirect('/login')
    }
  }).catch((err)=>{
    // res.send('登录失败')
    res.redirect('/login')
  })
})

// 退出登录
router.get('/logout', (req, res, next)=>{
  req.session.username = null
  req.session.isLogin = false
  // req.session.destroy()
  res.redirect('/login')
})

module.exports = router;


// let obj = {
//   a1: 1,
//   b1: 2,
//   c1: 3
// }
//
// let { a1, b1 } = obj
