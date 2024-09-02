const express = require("express");
const router = express.Router();
const path = require('path');
const file_path = path.join(__dirname,"../public");


router.get('/requset',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../frontend','build/index.html'));
})

router.post('/permit',(req,res)=>{
    res.sendFile(file_path+"/hockey.html");
    console.log("get data router",req.body);
    res.json({auth:'user'});
})
module.exports = router;
