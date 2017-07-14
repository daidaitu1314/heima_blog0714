module.exports = {
  showIndexPage(req, res) { // 渲染首页页面
    // 在调用 res.render 之前，需要先指定 express 的默认模板引擎，和 模板页面存储路径
    res.render('index', {
      islogin: req.session.islogin,
      user: req.session.user
    });
  }
}