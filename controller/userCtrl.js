var UserModel = require('../model/userModel.js');

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
  }
}