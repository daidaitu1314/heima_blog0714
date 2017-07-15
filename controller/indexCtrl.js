var articleModel = require('../model/articleModel.js');
var moment = require('moment');
var config = require('../config.js');

moment.locale('zh-cn');

module.exports = {
  /* showIndexPage(req, res) { // 渲染首页页面
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
  } */
  showIndexPage(req, res) { // 渲染首页页面
    // 获取所有文章列表，并渲染首页
    // 屏蔽一些非法的页码值
    var page = parseInt(req.query.page);
    if (page <= 0) {
      page = 1;
    }
    // 当前要显示的页码值
    var nowPage = page || 1;
    // 每页显示的记录条数
    var pageSize = config.pageSize;
    // 根据页码值和每页的记录条数，获取分页数据
    articleModel.getArticleByPage(nowPage, pageSize, (err, results) => {
      // 如果读取首页数据的时候，发生错误，则直接渲染页面
      if (err) return res.render('index', {
        islogin: req.session.islogin,
        user: req.session.user
      });

      // 在渲染页面之前，先格式化时间
      results[0].forEach(item => {
        // item.ctime = moment(item.ctime).format('YYYY-MM-DD HH:mm:ss');
        item.ctime = moment(item.ctime).fromNow();
      })

      // 在调用 res.render 之前，需要先指定 express 的默认模板引擎，和 模板页面存储路径
      // 所有记录的条数
      var totalCount = results[1][0].totalCount;
      res.render('index', {
        islogin: req.session.islogin,
        user: req.session.user,
        list: results[0], // 所有的文章列表
        totalPage: Math.ceil(totalCount / pageSize), // 获取总页数
        nowPage: nowPage // 当前的页码值
      });
    });
  }
}