var express = require('express');
var Router = express.Router();
var superagent = require('superagent');
var cheerio = require('cheerio');
var Article = require('../../model/airlineModal');

// uploadUrl : "three/upload", //上传url
// getArticleList : "three/getArticle
Router.post('/upload', (req, res, next) => {
    superagent.get(req.body.url)
        .end((err, data) => {
            if (err) {
                return res.send({
                    ret: false,
                    errMsg: "url抓取失败"
                })
            } else {
                var $ = cheerio.load(data.text);
                var title = $('.article-title').text();
                var p = $('.article-content p , h1 , h2, h3 , h4 , h5 , h6 , li , code').text() || $('article p , h1 , h2, h3 , h4 , h5 , h6 , li , code').text();
                if(!p){
                    return res.send({
                        ret : false,
                        errMsg : "无文章页面"
                    })
                }
                var totalNum = p.length;
                var chNum = p.match(/[\u4e00-\u9fa5]/g).length || 0;
                var enNum = p.match(/[a-zA-Z]/g).length || 0;
                var signNum = totalNum - chNum - enNum;
                let article = new Article({
                    url : req.body.url,
                    title : title,
                    chNum : chNum,
                    enNum : enNum,
                    totalNum : totalNum,
                    signNum : signNum
                });
                article.save((err,data)=>{
                    if(err){
                        return res.send({
                            ret : false,
                            errMsg : "结果未能存入数据库"
                        })
                    }else{
                        return res.send({
                            ret : true
                        })
                    }
                })
            }
        })
});
Router.get('/getArticle', (req, res, next) => {
    Article.find({},(err,data)=>{
        if(err){
            res.send({
                ret : false,
                errMsg : "数据获取失败"
            })
        }else{
            res.send({
                ret : true,
                data : data
            })
        }
    })
});

module.exports = Router;