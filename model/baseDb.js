var mysql = require('mysql');

// 创建一个数据库连接对象：
// mysql 这个第三方模块，默认不支持执行多条Sql语句；
// 如果想要人为的在一次查询中，执行多条Sql语句，需要手动开启一下这个功能：
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'gz_heima_blog_0714',
  multipleStatements: true // 开启执行多条Sql语句的功能
});

module.exports = connection;