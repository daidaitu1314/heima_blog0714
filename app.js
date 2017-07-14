// 导入 express 模块
var express = require('express');
var fs = require('fs');
var path = require('path');
// 调用 express 得到一个 网站服务器
var app = express();

// 托管静态资源 express.static
app.use('/node_modules', express.static('node_modules'));

// 注册 body-parser 中间件处理表单 post 数据
var bodyParser = require('body-parser');
// 注册 body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// 导入 session 中间件
var session = require('express-session');
// 注册 Session 中间件
app.use(session({
  secret: '这是一个加密的盐',
  resave: false, // 强制session保存到session store中【session默认是在内存中的，其实也可以保存到数据库中】
  saveUninitialized: false // 强制没有“初始化”的session保存到storage中【创建了session但是并没有修改这个session，就叫做未初始化】
}));

// 指定 express 的默认模板引擎
app.set('view engine', 'ejs');
// 指定 模板页面存储路径
app.set('views', './views');

/* // 导入 indexRouter 模块
var indexRouter = require('./router/indexRouter.js');
// 注册路由
app.use(indexRouter);
// 导入 userRouter 模块
var userRouter = require('./router/userRouter.js');
// 注册路由
app.use(userRouter); */


// 由于将来会有很多的路由模块。所以，每次单独导入并注册路由，比较麻烦
// 解决方案：读取 router 文件夹下所有的文件路径，然后使用 forEach 自动循环注册路由
fs.readdir(path.join(__dirname, './router'), (err, filenames) => {
  if (err) throw err;
  // 自动循环注册路由
  filenames.forEach(filename => {
    // 拼接每个路由模块的路径
    var routerPath = path.join(__dirname, './router', filename);
    // var m = require(routerPath);
    // app.use(m);
    app.use(require(routerPath));
  });
});

app.listen(3008, function () {
  console.log('http://127.0.0.1:3008');
});