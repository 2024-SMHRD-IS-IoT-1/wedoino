const express = require("express");
const router = express.Router();
const path = require('path');
const conn = require("../config/DB");

router.get('/', (req, res) => {
    console.log("main");
    //리엑트 페이지 응답설정
    // res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
})
router.post('/getData', (req, res) => {
    console.log("get data router", req.body);
    // res.json({auth:'user'});
    let { id, pw } = req.body;
    console.log(id, pw)
    let sql = "select emp_name from tb_employee where emp_no=? and emp_pw=?";
    // console.log(sql,[id,pw]);
    conn.query(sql, [id, pw], (err, rows) => {
        if (rows.length > 0) {
            console.log(rows);
            res.json("성공")
        }else{
            res.json("실패")
        }

    })


})


module.exports = router;
