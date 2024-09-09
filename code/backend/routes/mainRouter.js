const express = require("express");
const router = express.Router();
const path = require('path');
const conn = require("../config/DB");

router.get('/', (req, res) => {
    console.log(req.body)
    if (req.body.data == "1") {//주기적으로 주차현황을 보내줌
        console.log("main");
        sql = "select parking_lot, parking_duration from tb_parking order by created_by DESC"
        conn.query(sql, (err, rows) => {    //리엑트 페이지 응답설정
            console.log(rows);
            res.json(rows);
        })
    }else{// 주차자리를 클릭하면 자리에 대한 정보를 보내줌
        sql = "select panel_idx, parking_location from tb_solar_panel order by created_by DESC"
        conn.query(sql,(err,rows) =>{
            res.json(rows);
        })
    }})
router.post('/login', (req, res) => {
    console.log("get data router", req.body);
    // res.json({auth:'user'});
    let { id, pw } = req.body;
    console.log(id, pw)
    let sql = "select emp_name,emp_job,emp_grade,emp_region from tb_employee where emp_no=? and emp_pw=?";
    // console.log(sql,[id,pw]);
    conn.query(sql, [id, pw], (err, rows) => {
        if (rows.length > 0) {
            console.log(rows);
            const infoObj = {
                name: rows[0].emp_name,
                // job : rows.emp_job,
                // grade : rows.emp_grade,
                // region : rows.emp_region
            }; //세션에 저장할 객체 생성
            req.session.info = infoObj //세션 저장
            // sql결과와 세션을 fe에 전송
            res.json({
                result: "로그인 성공",
                info: req.session.info
            })
        } else {
            res.json({ result: "로그인 실패" })
        }

    })
})
router.get('/logout', (req, res) => {
    if (!req.session.info) {
        res.json("세션삭제");
        req.session.destroy();
    }
    else res.json("세션삭제 실패");
})


module.exports = router;
