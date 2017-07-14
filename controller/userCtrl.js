module.exports = {
  showRegisterPage(req, res){ // 展示用户注册页面
    res.render('./user/register');
  },
  showLoginPage(req, res){ // 展示登录
    res.render('./user/login');
  }
}