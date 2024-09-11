const express = require("express");
const router = express.Router();
const conn = require("../config/DB");
const { exec } = require('child_process');
const path = require('path');

const scriptPath = path.join(__dirname, '../../','DB/db_selected.py');



router.post('/', (req, res) => {
    // Python 스크립트 실행
    console.log(scriptPath);
    
    exec(`python ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error('실행 오류:', error);
        }
        if (stderr) {
            console.error('표준 에러:', stderr);
        }
        // Python 스크립트에서 출력한 JSON 문자열을 객체로 변환
        const jsonData = JSON.parse(stdout);
        // 결과 출력
        console.log(jsonData);
        res.json(jsonData);
    });
})

module.exports = router;
