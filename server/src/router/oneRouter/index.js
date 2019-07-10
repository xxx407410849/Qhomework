var express = require('express');
var Router = express.Router();
var data = require('../../../data');
Router.get('/date',(req,res,next)=>{
    res.json(data.dateList);
});
Router.get('/airlineInfo',(req,res,next)=>{
    res.json(data.airlineInfo);
});

module.exports = Router;