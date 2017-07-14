var Db = require('./baseDb.js');

module.exports = {
  getUserByUsername(name, callback) { // 根据用户名，查询相关的用户信息
    var sqlStr = 'select * from users where username=?';
    Db.query(sqlStr, [name], callback);
  },
  addNewUser(user, callback) { // 注册新的用户
    var sqlStr = 'insert into users set ?';
    Db.query(sqlStr, user, callback);
  },
  getUserByUsernameAndPwd(user, callback) { // 根据用户名和密码去获取用户信息
    var sqlStr = 'select * from users where username=? and password=?';
    Db.query(sqlStr, [user.username, user.password], callback);
  }
}