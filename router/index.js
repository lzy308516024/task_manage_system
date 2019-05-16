const express = require('express'),
{ user } = require('../model/sch'),
crypto = require('crypto'),
router = express.Router();

router.get('/',(req,res)=>{
    res.render('index',{
        login:req.session.login,
        user:req.session.user,
        title:'首页'
        
    })
})

router.get('/reg',function(req,res){
    res.render('reg')
}).post('/reg',function(req,res){
    console.log(req.body);
    user.findOne({username:req.body.username}).then((data)=>{
        if(data){
            console.log(1111);
            return res.send({
                code:2,
                msg:'用户已存在'
            })
        }
        //加密
        const c  = crypto.createHash('sha256');
        const password = c.update(req.body.password).digest('hex');
        user.create({
            username:req.body.username,
            password:password
        }).then((data)=>{
            res.send({code:1,msg:"注册成功"})
        })
        

    })
    
});

router.get('/login',function(req,res){
    // console.log(req.session.login);
    res.render('login', {
        login:req.session.login,
        title:'首页'
    });
}).post('/login',function(req,res){
    //判断用户名是否存在
    user.findOne({username:req.body.username},function(err,data){
        
        if(data) {
            const c  = crypto.createHash('sha256');
            const password = c.update(req.body.password).digest('hex');
            if(data.password === password){
                req.session.login = true;
                req.session.user = data;
                return res.send({msg:'登陆成功',code:0})
            }
            return res.send({msg:'密码错误'});
        }
        res.send({
            msg:'用户不存在'
        })
    })
})

router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})

//给单独的某个路由设置权限
router.get('/admin',function(req,res,next){
    
    if(req.session.user.level >= 10){
        return next();
    }
},function(req,res){
 res.send('houtaoi')
})

module.exports = router;
