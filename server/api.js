var express = require('express');
var logger = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var multer = require('multer');
var config = require('./src/common/config');
//注册router
var oneRouter = require('./src/router/oneRouter/index');
var threeRouter = require('./src/router/threeRouter/index');
//配置
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
//连接数据库
app.use(session({
    secret: config.cookieSecret,
    key: config.db,
    store: new MongoStore({
        url: config.mongodb
    }),
    cookie: {
        maxAge: 60 * 1000 * 30
    },
    resave: false,
    saveUninitialized: true
}));
//跨域设置
app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Access-Token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header('X-Powered-By', 'lancelot');
    //res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method == "OPTIONS") {
        //加速options请求
        res.sendStatus(200);
    } else {
        next();
    }
});

app.get('/', (req, res) => {
    res.send("hello world");

})
app.use('/one',oneRouter);
app.use('/three',threeRouter);

const server = app.listen(config.apiPort, () => {
    console.log("start");
})