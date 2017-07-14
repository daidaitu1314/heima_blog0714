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

// 当客户端请求 / 根路径的时候，返回 index 首页
app.get('/', (req, res) => {
  // 在调用 res.render 之前，需要先指定 express 的默认模板引擎，和 模板页面存储路径
  res.render('index');
});

app.listen(3008, function () {
  console.log('http://127.0.0.1:3008');
});