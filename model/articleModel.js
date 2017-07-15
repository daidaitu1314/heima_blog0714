var Db = require('./baseDb.js');

module.exports = {
  addArticle(article, callback) { // 添加文章
    var sqlStr = 'insert into articles set ?';
    Db.query(sqlStr, [article], callback);
  }
}