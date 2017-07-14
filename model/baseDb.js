var mysql = require('mysql');

// 创建一个数据库连接对象：
var connection = mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'123456',
  database:'gz_heima_blog_0714'
});

module.exports = connection;