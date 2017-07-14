var express = require('express');
// 创建一个路由对象
var router = express.Router();

// 导入文章controller
var articleCtrl = require('../controller/articleCtrl.js');

// 当客户端请求 / 根路径的时候，返回 index 首页
router.get('/article/add', articleCtrl.showAddArticlePage) // 展示首页页面

module.exports = router;