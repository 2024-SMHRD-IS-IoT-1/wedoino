const express = require("express");
const router = express.Router();
const path = require('path');
const conn = require("../config/DB");



router.get('/requset', (req, res) => {
    console.log("get data router", req.body);
    let { username, userpw1, userbirth, userphone } = req.body;

    let sql = "INSERT INTO tb_employee (emp_pw, emp_name, emp_birthdate, emp_phone) VALUES ( md5(?), ?, ?, 'emp_phone 1');"
    conn.query(sql, [username, userpw1, userbirth, userphone], (err, rows) => {
        console.log("rows", rows)
        if (rows) res.json("성공")
        else res.json("실패")
    })//쿼리문 작성되면 함수 작동

})

//등록 허락
router.post('/permit', (req, res) => {
    if (!req.body.user_region) {
        //검색
        console.log("검색");
        console.log(req.body);//사용자가 검색한 단어
        
        //폰번호
        let { userphone } = req.body;
        let sql = "select emp_name, emp_birthdate, emp_phone from tb_employee where emp_phone = ?"
        
        conn.query(sql, [userphone], (err, rows) => {
            console.log("rows", rows,"왜 된것이냐!")
            if (rows[0]) {
                res.json(rows)
            }
            else res.json("실패")
        })//phone으로 사원 검색해서 정보전송

    } else {
        console.log("등록");
        //추가된 정보 가져오기 지역 직급 등급 입사일
        console.log("get data router", req.body);
        const add = req.body;
        let sql = "update tb_employee set emp_region = ?,emp_job=?,emp_grade=?,joined_at=?,permit='O' where userphone=?"
        conn.query(sql, [add.user_region, add.user_job, add.user_grade, add.starting_date, add.user_phone], (err, rows) => {
            console.log("rows", rows)
            if (rows) res.json("성공")
            else res.json("실패")
        })
        const user = req.body;
        console.log(user.user_region);
        // setUserDatas({  
        //     user_phone : user.phone,
        //     user_region: region,
        //     user_position: position,
        //     user_grade: grade,
        //     starting_date: startdate
        // })
    }
})

module.exports = router;
