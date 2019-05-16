const express = require('express'),
router = express.Router(),
path = require('path'),
multer = require('multer');
const storage =  multer.diskStorage({
    destination: path.join(process.cwd(),'public/upload'),
    filename:function(req,file,callback) {
        const h = file.originalname.split('.');
        const filename = `${Date.now()}.${h[h.length-1]}`;
        
        callback(null,filename)
    }
})

const fileFilter = function(req,file,cb){
    if(file.mimeType === 'image/gif'){
        cb(null,true)
    }else {
        cb(null,false)
    }
}

const upload = multer({
    storage,
    // fileFilter,
});



router.post('/upload',function(req,res){
    upload.single('file')(req,res,function(err){
        if(err){
            return res.send({code:1})
        }
        
        res.send({code:0,data:{
            src:`/upload/${req.file.filename}`
        }})
    })
})

module.exports = router;