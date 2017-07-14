module.exports = {
  showAddArticlePage(req, res) { // 展示文章添加页面
    if (!req.session.islogin) { // 证明是非法访问 这个文章添加页面的
      res.redirect('/login');
    } else {
      // 渲染文章添加页面
      res.render('./article/add', {
        islogin: req.session.islogin,
        user: req.session.user
      });
    }
  }
}