var Db = require('./baseDb.js');

module.exports = {
  addArticle(article, callback) { // 添加文章
    var sqlStr = 'insert into articles set ?';
    Db.query(sqlStr, [article], callback);
  },
  getArticleById(id, callback) { // 根据文章的Id获取文章的信息
    var sqlStr = 'select articles.*, users.nickname from articles LEFT JOIN users on articles.authorId=users.id where articles.id=?';
    Db.query(sqlStr, [id], callback);
  }
}