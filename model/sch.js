const mongoose = require('mongoose');

//用户详情
const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    used:{type:Boolean,default:false,required:true}, //账号是否可用
    //普通用户 1 管理员用户 10  超级管理员999
    level:{type:Number,required:true,default:1 },
    //任务状态
    task:{
        //发布的任务
        publish:{type:[{type:mongoose.Schema.Types.ObjectId,ref:'task'}] },
        //已经接取的任务
        receive:{ type:[{type:mongoose.Schema.Types.ObjectId,ref:'task'}]},
        //已经完成的任务
        accomplish:{ type:[{type:mongoose.Schema.Types.ObjectId,ref:'task'}]}
    }
})

//任务详情
const taskSchema = new mongoose.Schema({
    title: {type:'String'},
    content:{type:'String'},
    author:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    receiver:{type:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}]},
    time: {type:String},
    num:{type:Number},//接取人数限制
    reward: {type:String},
    difficulty:{type:String},
    expiration:{tyoe:String}
})

// 创建表
const user = mongoose.model('user',userSchema);
const task = mongoose.model('task',taskSchema);

module.exports = {
    user,
    task
}