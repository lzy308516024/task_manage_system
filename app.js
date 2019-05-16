const express = require('express'),
app = express(),
session = require('express-session'),
Mongosession = require('connect-mongo')(session),
mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://localhost/a',{useNewUrlParser:true});

app.use(session({
    secret:'dsdsa', //密钥
    rolling:true,
    resave:false,//是否每次请求都重新保存
    saveUninitialized:false, //是否默认设置初始值
    cookie:{maxAge:100*60*60},
    store:new Mongosession({
        url:'mongodb://localhost/a'
    })
}))

//获取post参数
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//静态资源目录
app.use(express.static(__dirname+'/public'));
// app.use(express.static(__dirname+'/layui'));


//到哪里去寻找引擎
//模板引擎
app.set('views',__dirname+'/view');
app.set('view engine','ejs');

app.use('/',require('./router/index.js'));
app.use('/api',require('./router/api'))
app.use('/admin',require('./router/admin.js'));

app.listen(3001);