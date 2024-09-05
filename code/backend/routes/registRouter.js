const express = require("express");
const router = express.Router();
const path = require('path');

const user = {};


router.get('/requset',(req,res)=>{
    console.log("get data router",req.body);
    let {username, userpw1, userbirth, userphone}= req.body;
    
    let sql = "INSERT INTO tb_employee (emp_pw, emp_name, emp_birthdate, emp_phone) VALUES ( md5(?), ?, ?, 'emp_phone 1');"
    conn.query(sql,[username, userpw1, userbirth, userphone],(err,rows)=>{
        console.log("rows",rows)
        if(rows)    res.json("성공")
        else        res.json("실패")
    })//쿼리문 작성되면 함수 작동
    
})

router.post('/permit',(req,res)=>{
    const data = [];
    let sql = "select username, userpw1, userbirth, userphone from tb_employee where permit = 'X'"
    conn.query(sql,(err,rows)=>{
        console.log("rows",rows)
        if(rows)    {
            res.json(rows)
        }
        else        res.json("실패")
    })//permit이 되지 않은 것만 찾아서 전송

    //추가된 정보 가져오기 지역 직급 등급 입사일
    console.log("get data router",req.body);
    sql = "update tb_employee set emp_region = ?,emp_job=?,emp_grade=?,joined_at=?,permit='O' where username=?&&userbirth=?&&userphone=?"
    conn.query(sql,[username, userbirth, userphone],(err,rows)=>{
        console.log("rows",rows)
        if(rows>0) {
            // req.session.user = {ID:rows[0].id}
            res.json("성공")
        }else{
            res.json("실패")
        }        
    })//permit이 되지 않은 것만 찾아서 전송

    user = req.body;
    console.log(user.username);
    res.json(user);
})

module.exports = router;
