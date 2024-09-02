const express = require("express");
const router = express.Router();
const path = require('path');


router.get('/requset',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../frontend','build/index.html'));
})

router.get('/permit',(req,res)=>{

})
module.exports = router;
