let mongoose = require('mongoose');
let config = require('../common/config');
mongoose.connect(config.mongodb);
//文章列表
let ArticleSchema = new mongoose.Schema({
    url : String, //文章链接
    title : String, //文章标题
    totalNum : Number, //文章字符总数
    enNum : Number, //英文字符总数
    chNum : Number, //中文字符总数
    signNum : Number //标点总数
});
//创建User集合
var Article = mongoose.model('Article',ArticleSchema);
//暴露接口
module.exports = Article;