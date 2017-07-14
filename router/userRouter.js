var express = require('express');
// 创建一个路由对象
var router = express.Router();

// 导入用户controller
var userCtrl = require('../controller/userCtrl.js');

router
  .get('/register', userCtrl.showRegisterPage) // 请求用户注册页面
  .get('/login', userCtrl.showLoginPage) // 展示登录页面
  .post('/register', userCtrl.registerNewUser) // 注册新用户
  .post('/login', userCtrl.login) // 用户登录
  .get('/logout', userCtrl.logout) // 注销登录

module.exports = router;