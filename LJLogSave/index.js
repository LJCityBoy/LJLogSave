
var express = require("express");

var app = express();

var mongood = require("mongoose");

//模板引擎
var swig = require("swig");

app.engine('html',swig.renderFile);

//指定html文件
app.set('views','./views');
app.set('view engine','html');

//取消模板缓存
swig.setDefaults({cache:false});

//声明使用本地的静态文件
app.use('/public',express.static(__dirname + '/public'));
//获取静态文件
app.get('/css.css',function (req,res,next) {
    //设置请求头
    res.setHeader('content-type','text/css');
    res.send('body{background:red;}');
});

var bodyParser = require('body-parser');
//bodyParser设置
app.use(bodyParser.urlencoded({extended:true}));


app.use('/',require('./routers/main/main'));

var db = mongood.connect('mongodb://localhost:27019/LJLogSave',function(err){
    if(err){
        console.log(err);
    }else{
        console.log("数据库连接成功！");
        app.listen(8008);

    }
});




