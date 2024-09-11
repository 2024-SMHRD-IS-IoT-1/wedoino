//기본모듈가져오기 
const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');
const session = require("express-session");
const fileStore = require("session-file-store")(session);
//라우터
const main = require("./routes/mainRouter");
const panel = require("./routes/penalRouter");
const regist = require("./routes/registRouter");



//리엑트프로젝트 경로 설정
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
app.use(express.json());

//cors설정
app.use(cors());

//주기적으로 만료된 세션 정리
let fileStoreOptions = {
    path: './sessions',
    reapInterval: 10
}
//세션 등록
app.use(session({
    httpOnly: true,    //http로 접근한 요청만 처리
    resave: false,     //세션을 항상 재저장할지 확인
    secret: "secret",       //암호화할때 사용된 키값
    store: new fileStore(fileStoreOptions),    //세션을 저장할 공간 할당
    saveUninitialized: false,    //세션이 비어있더라도 저장할거냐?
    expires: new Date(Date.now() + 60),
    cookie : {maxAge : 3000}    //쿠키 나이
}))

//경로 설정
app.use('/', main);
app.use('/panel', panel);
app.use('/regist', regist);


//포트설정
//환경변수에 지정된 포트번호가 있다면 사용, 없으면 8000번 사용
app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), () => {
    console.log(`server is running on ${app.get('port')}`);
})