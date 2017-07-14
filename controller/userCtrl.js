var UserModel = require('../model/userModel.js');
// 导入 MD5 加密模块
var md5 = require('blueimp-md5');
var config = require('../config.js');

module.exports = {
  showRegisterPage(req, res) { // 展示用户注册页面
    res.render('./user/register');
  },
  showLoginPage(req, res) { // 展示登录
    res.render('./user/login');
  },
  registerNewUser(req, res) { // 注册新用户
    // 注册新用户的逻辑：
    // 1. 获取到提交过来的 用户表单数据
    var newUser = req.body;
    // 2. 先根据当前提交的用户名，去数据库中检查有没有被注册
    // 3. 将数据写入到数据库
    UserModel.getUserByUsername(newUser.username, (err, results) => {
      // 如果发生错误，则直接返回结果，并终止后续代码执行
      if (err) return res.json({
        err_code: 1,
        msg: '用户注册失败，请稍后再试！'
      })

      // 没有发生错误
      // console.log(results);
      // 如果当前用户名没有被占用，则返回 空数组
      // [ RowDataPacket { id: 1, username: 'zs', password: '123', nickname: '娃哈哈' } ]
      // !==0 表示此用户名不能被重复注册
      if (results.length !== 0) return res.json({
        err_code: 1,
        msg: '此用户名已存在，请注册其他用户名！'
      });

      // 如果能走到这里，表示此用户名可以用：
      // 在将用户写入到数据库之前，先使用MD5模块进行一下密码加密
      newUser.password = md5(newUser.password, config.pwdSalt);
      // 将加盐加密后的用户信息，保存到数据库中
      UserModel.addNewUser(newUser, (err, results) => {
        if (err) return res.json({
          err_code: 1,
          msg: '用户注册失败，请稍后再试！'
        });
        // 没有发生错误，直接返回注册成功
        res.json({
          err_code: 0
        });
      });
    });
  },
  login(req, res) { // 用户登录
    // 登录的逻辑：
    //   1. 先获取用户提交过来的表单数据，拿到用户填写的信息对象
    //   2. 根据用户填写的信息，调用Model层，去核对【匹配】对应的用户数据
    //   3. 如果能找到对应的用户信息，就表示用户登录成功；否则用户登录失败！
    var userInfo = req.body;
    // md5('1234', '盐')   =>     如果密码填写正确，那么加密后的结果和数据库中保存的32密码相等
    userInfo.password = md5(userInfo.password, config.pwdSalt);
    // 根据加密后 密码字符串， 去尝试登录
    UserModel.getUserByUsernameAndPwd(userInfo, (err, results) => {
      // 这是调用 Model 查询失败的情况
      if (err) return res.json({
        err_code: 1,
        msg: '登录失败，请稍后再试！'
      });

      // 如果 results 的长度不等于1，表示用户登录失败！
      if (results.length !== 1) return res.json({
        err_code: 1,
        msg: '用户名或密码错误！'
      });

      // 登录成功：
      res.json({
        err_code: 0
      });
    });
  }
}