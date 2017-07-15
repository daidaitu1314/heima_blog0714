var ArticleModel = require('../model/articleModel.js');

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
  },
  addNewArticle(req, res) { // 添加新文章
    var newArticle = req.body;
    // 将文章信息组织完整：
    newArticle.ctime = new Date();
    // console.log(newArticle);
    // 下面这种方式获取登录用户Id存在缺陷：就是用户 session 过期之后，就获取不到登录用户的Id了，这时候发表文章会失败！
    // newArticle.authorId = req.session.user.id;
    // 新建一张数据库的表  id, title, content, authorId, ctime
    // 将文章数据保存到数据库中
    // 调用 ArticleModel 层，去进行文章的保存操作
    ArticleModel.addArticle(newArticle, (err, results) => {
      if (err) return res.json({
        err_code: 1,
        msg: '发表文章失败，请骚后再试！'
      });

      // 如果文章发表OK，那么直接将刚发表文章的 id 返回给客户端
      res.json({
        err_code: 0,
        id: results.insertId
      });
    });
  }
}