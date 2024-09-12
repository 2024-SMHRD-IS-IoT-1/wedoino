const express = require("express");
const router = express.Router();
const path = require('path');
const conn = require("../config/DB");

router.post('/', (req, res) => {
    console.log(req.body)
    let go='';
    if (req.body.data == "1") {//주기적으로 주차현황을 보내줌
        //flame
        sql1 = "select parking_lot from tb_flame where created_at>= DATE_ADD(NOW(), INTERVAL -10 MINUTE);"
        conn.query(sql1, (err, rows) => {
            if (rows) {
                go = rows;
                // console.log(rows);
            }
        })
        //주차현황
        sql = "select parking_lot, parking_duration, created_at, panel_idx from tb_parking where created_at >= date(now()) order by created_at DESC LIMIT 2;"
        conn.query(sql, (err, rows) => {    //리엑트 페이지 응답설정
            console.log(rows);
            res.json({fire: go , park : rows});
            console.log({fire: go , park : rows})
        })

    } else {// 주차자리를 클릭하면 자리에 대한 정보를 보내줌
        console.log(req.body.data)
        sql = "select panel_idx, panel_location from tb_solar_panel where panel_idx =(select panel_idx from tb_parking where parking_lot=?order by created_at desc limit 1);"
        conn.query(sql, [req.body.data], (err, rows) => {
            console.log(rows);
            // console.log(err);
            sql_f = "select parking_lot from tb_flame where created_at>= DATE_ADD(NOW(), INTERVAL -10 MINUTE) and parking_lot=?;"
            conn.query(sql_f,[req.body.data],(err1,rows1)=>{

            res.json({ park: rows, fire : rows1 });

            })
        })
    }
})



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
        req.session.destroy(function () {
            req.session;
        });

        res.json("세션삭제");
    }
    else res.json("세션삭제 실패");
})


module.exports = router;
