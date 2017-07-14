var express = require('express');
// 创建一个路由对象
var router = express.Router();

// 1. 导入 index 相关的业务逻辑处理模块
var indexCtrl = require('../controller/indexCtrl.js');

// 当客户端请求 / 根路径的时候，返回 index 首页
router.get('/', indexCtrl.showIndexPage) // 展示首页页面

module.exports = router;