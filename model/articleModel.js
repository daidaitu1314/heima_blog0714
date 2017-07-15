var Db = require('./baseDb.js');

module.exports = {
  addArticle(article, callback) { // 添加文章
    var sqlStr = 'insert into articles set ?';
    Db.query(sqlStr, [article], callback);
  },
  getArticleById(id, callback) { // 根据文章的Id获取文章的信息
    var sqlStr = 'select articles.*, users.nickname from articles LEFT JOIN users on articles.authorId=users.id where articles.id=?';
    Db.query(sqlStr, [id], callback);
  },
  editArticle(article, callback) { // 编辑文章
    var sqlStr = 'update articles set ? where id=?';
    Db.query(sqlStr, [article, article.id], callback);
  },
  getArticleAll(callback) { // 获取所有文章列表
    var sqlStr = 'select articles.*, users.nickname from articles LEFT JOIN users on  articles.authorId=users.id ORDER BY articles.ctime desc';
    Db.query(sqlStr, callback);
  },
  getArticleByPage(page, pageSize, callback) { // 根据页码去获取对应的文章数据
    var offset = (page - 1) * pageSize; // (nowPage-1)*pageSize
    var sqlStr = 'select articles.*, users.nickname from articles LEFT JOIN users on articles.authorId=users.id ORDER BY articles.ctime desc LIMIT ?,?';
    Db.query(sqlStr, [offset, pageSize], callback);
  }
}