var ArticleModel = require('../model/articleModel.js');
var moment = require('moment');
var mditor = require("mditor");

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
  },
  showArticleInfoPage(req, res) {// 展示文章详情页
    // 获取 URL 地址中的Id参数
    var id = req.query.id;  //  从URL地址栏中获取参数
    // req.body   从表单中获取数据
    // 在渲染文章详情页的时候，需要根据文章 id ,获取到文章的信息
    ArticleModel.getArticleById(id, (err, results) => {
      // 如果展示文章详情出错，直接跳转到首页
      /* if(err) return res.redirect('/');
      if(results.length!==1) return res.redirect('/'); */
      if (err || results.length !== 1) return res.redirect('/');

      var articleInfo = results[0];
      articleInfo.ctime = moment(articleInfo.ctime).format('YYYY-MM-DD HH:mm:ss');
      // 将 文章内容从 markdown 语法 转换成 HTML 字符串
      articleInfo.content = (new mditor.Parser()).parse(articleInfo.content);
      res.render('./article/info', {
        islogin: req.session.islogin,
        user: req.session.user,
        article: articleInfo // 把文章信息传递进去进行渲染
      });
    });

  },
  showEditArticlePage(req, res) { // 显示编辑文章页面
    // 获取文章Id
    var id = req.query.id;
    // 根据Id获取文章信息
    ArticleModel.getArticleById(id, (err, results) => {
      // 如果获取文章信息失败，或者没有登录，则直接跳转到首页
      if (err || req.session.islogin !== true) return res.redirect('/');

      // 如果 当前登录的用户Id不等于当前文章的作者Id，那么说明当前是非法（通过在地址栏直接输入URL地址）进来的，这直接跳转到 / 首页
      if (req.session.user.id !== results[0].authorId) {
        return res.redirect('/');
      }
      // 如果获取文章信息成功，则渲染编辑页面
      res.render('./article/edit', {
        islogin: req.session.islogin,
        user: req.session.user,
        article: results[0]
      });
    });

  },
//   1. 如果当前用户未登录，则在查看文章详情页的时候，不能显示 “编辑此文章”按钮
//   2. 如果当前用户已登录，不一定能显示“编辑此文章”按钮，因为不能确定当前文章是否为当前用户发表的！
//   3. 如何确定当前文章是当前登录用户发表的呢？
//     + 当前登录的用户，有自己的用户Id，当前查看的这篇文章，有这篇文章的作者Id，拿着登录Id去和作者Id进行匹配，如果相等则可以显示，否则不显示
  editArticle(req, res) { // 编辑文章信息
    // 1. 获取 客户端 post提交进来的 文章信息【经过证明：提交上来的文章信息是完整的】
    var article = req.body;
    // console.log(new Date(article.ctime));
    // 由于客户端发送过来的时间是一个字符串，所以我们在写入到数据库之前，需要先把时间转成一个 真正的JS日期对象，这样就能保存成功了！
    article.ctime = new Date(article.ctime);
    // console.log(article);
    // 2. 调用 ArticleModel 中相关的方法，去保存这篇被修改的文章
    ArticleModel.editArticle(article, (err, results) => {
      if (err) return res.json({
        err_code: 1,
        msg: '编辑文章失败！请稍后再试！'
      });
      // 文章编辑OK
      res.json({
        err_code: 0
      });
    });
  }
}