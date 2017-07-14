// 导入 http 内置模块
var http = require('http');
var querystring = require('querystring');

// 创建一个 http 服务器
var server = http.createServer();
// 监听 http 服务器的 request 请求
server.on('request', function (req, res) {
  var url = req.url;

  if (url === '/') {
    // 服务器端无法保证每次都能拿到cookie，如果拿不到，值是 undefined
    // console.log(req.headers.cookie);
    var cookieStr = req.headers.cookie;
    // console.log(cookieStr);
    // 使用 querystring 模块解析 cookie字符串
    var cookie = {};
    if (cookieStr) {
      cookie = querystring.parse(cookieStr, '; ', '=');
    }

    if (cookie.isvisit === 'yes') { // 曾经来过
      res.writeHeader(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      res.end('不要太贪心哦！');
    } else {
      // 设置 过期时间为 10 秒之后  1000 * 60 *60 *24
      var expiresTime = new Date(Date.now() + 1000 * 10).toUTCString(); // GTM  UTC
      // 默认，如果不设置 cookie 的过期时间，那么默认是浏览器关闭后失效！
      res.writeHeader(200, {
        'Content-Type': 'text/html; charset=utf-8',
        // 'Set-Cookie': ['isvisit=yes; expires=传递一个规定格式的时间字符串', 'age=20'] // 通过 set-cookie向客户端写入cookie
        'Set-Cookie': ['isvisit=yes; expires=' + expiresTime, 'age=20'] // 通过 set-cookie向客户端写入cookie
      });

      res.end('呐，送你一朵小黄鸡！');
    }

    // 需求：如果你之前没有访问过服务器，那么返回小黄鸡；如果曾经访问过，就提示他：不要太贪心哦！

  } else {
    res.end('404');
  }
});

// 指定端口号并启动服务器监听
server.listen(3000, function () {
  console.log('server listen at http://127.0.0.1:3000');
});