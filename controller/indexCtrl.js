var articleModel = require('../model/articleModel.js');
var moment = require('moment');

module.exports = {
  showIndexPage(req, res) { // 渲染首页页面
    // 获取所有文章列表，并渲染首页
    articleModel.getArticleAll((err, results) => {
      // 如果读取首页数据的时候，发生错误，则直接渲染页面
      if (err) return res.render('index', {
        islogin: req.session.islogin,
        user: req.session.user
      });

      // 在渲染页面之前，先格式化时间
      results.forEach(item => {
        item.ctime = moment(item.ctime).format('YYYY-MM-DD HH:mm:ss');
      })

      // 在调用 res.render 之前，需要先指定 express 的默认模板引擎，和 模板页面存储路径
      res.render('index', {
        islogin: req.session.islogin,
        user: req.session.user,
        list: results // 所有的文章列表
      });
    });


  }
}