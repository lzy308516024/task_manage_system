const express = require('express'),
{ user } = require('../model/sch'),
crypto = require('crypto'),
router = express.Router();

router.use(function(req,res,next){
    
    if(req.session.login){
        if(req.session.user.level >= 10){
            return next()
        }
        return res.send('没有权限')
    }
    res.send('没有登陆');
})

router.get('/user',function(req,res){
    
     res.render('admin/user',{
         user:req.session.user,
         title:'用户管理'
     })
}).post('/user',(req,res)=>{
    // //从第几个开始查找  查找多少个
    // user.find(
    //     // function(err,data){
    //     //     if(err){console.log(err)}
    //     //     // ui框架 code：0成功
    //     //     res.send({code:0, data})
    //     // }
    // ).skip((req.body.page - 1)*req.body.limit).limit(Number(req.body.limit));
    // user.countDocumnets() //总共多少条

    Promise.all([
        
        user.find().skip((req.body.page - 1)*req.body.limit).limit(Number(req.body.limit)),
        user.countDocuments(),//总共多少条
    ]).then(function(data){
        
        res.send({code:0,data:data[0],count:data[1]})
    })
})

router.get('/task/add',function(req,res){
    res.render('admin/addtask',{
        title:'发布',
        user:req.session.user
    })
})

module.exports = router;