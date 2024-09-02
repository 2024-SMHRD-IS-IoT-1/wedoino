//기본모듈가져오기 
const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');
//라우터
const main = require("./routes/mainRouter");
const panel = require("./routes/penalRouter");
const regist = require("./routes/registRouter");



//리엑트프로젝트 경로 설정
app.use(express.static(path.join(__dirname,'..','frontend','build')));
app.use(express.json());

//cors설정
app.use(cors());

//경로 설정
app.use('/',main);
app.use('/panel',panel);
app.use('/regist',regist);


//포트설정
//환경변수에 지정된 포트번호가 있다면 사용, 없으면 8000번 사용
app.set('port',process.env.PORT || 8000);
app.listen(app.get('port'),()=>{
    console.log(`server is running on ${app.get('port')}`);
})