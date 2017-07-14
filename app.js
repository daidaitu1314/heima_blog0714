// 导入 express 模块
var express = require('express');
// 调用 express 得到一个 网站服务器
var app = express();

// 托管静态资源 express.static
app.use('/node_modules', express.static('node_modules'));

// 指定 express 的默认模板引擎
app.set('view engine', 'ejs');
// 指定 模板页面存储路径
app.set('views', './views');

// 导入 indexRouter 模块
var indexRouter = require('./router/indexRouter.js');
// 注册路由
app.use(indexRouter);

app.listen(3008, function () {
  console.log('http://127.0.0.1:3008');
});