var express = require('express');
var logger = require('morgan');
var path = require('path');
var httpProxy = require('http-proxy');
var connectHistoryFallBack = require('connect-history-api-fallback');
var config = require('./src/common/config');
const app = new express();
app.use(logger('dev'));

//代理设置
const targetUrl = `http://127.0.0.1:${config.apiPort}`;
const proxy = httpProxy.createProxyServer({
    target : targetUrl
});

//代理转发
app.use('/getData',(req,res)=>{
    proxy.web(req,res,{target : targetUrl});
})

//移交router权限
app.use('/',connectHistoryFallBack());

//静态资源托管
console.log(path.join(__dirname,'..','dist'));

//热更新配置
if (process.env.NODE_ENV !== 'production') {
    var webpack = require('webpack');
    var webpackConfig = require('../webpack.config.js');
    var webpackCompiled = webpack(webpackConfig);
    // 配置运行时打包
    var webpackDevMiddleware = require('webpack-dev-middleware');

    app.use(webpackDevMiddleware(webpackCompiled, {
      publicPath: "/",
      stats: {colors: true},
      lazy: false,
      watchOptions: {
          aggregateTimeout: 300,
          poll: true
      },
    }));
    //刷新
    var webpackHotMiddleware = require('webpack-hot-middleware');
    app.use(webpackHotMiddleware(webpackCompiled));
}
const server = app.listen(config.port, () => {
    console.log("start");
})